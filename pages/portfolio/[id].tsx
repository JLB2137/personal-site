import { useEffect, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import imageUrlBuilder from '@sanity/image-url';
import sanity from '../../client';
import Image from 'next/image'
import {GetStaticPropsContext} from 'next';
  
  
interface Image {
    _key: string,
    _type: string,
    asset: {
        _ref: string,
        _type: string
    },
    imageName: string
}
  
interface Description {
    _key: string,
    _type: string,
    children: [
      {
        _key: string,
        _type: string,
        marks: [],
        text: string
      }
    ],
    markDefs: [],
    style: string
}
  
  
interface ProjectType {
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string,
    completionDate: string,
    features: Description[],
    gitURL: string,
    images: Image[],
    projectName: string,
    projectURL: string,
    shortDescription: Description[]
    slug: { _type: string, current: string },
    technology: Description[],
}
  
interface Props {
    githubHeight: number,
    githubWidth: number,
    imageWidthPDP: number,
    imageHeightPDP: number,
    screenWidth: string,
    project: ProjectType,
    images: string[]
}


export function getAllPostIds(slugs: string[]) {
    return slugs.map(slug => {
      return {
        params: {
          id: slug
        }
      }
    })
}

export async function getStaticProps({params}:GetStaticPropsContext) {
    const project: ProjectType = await sanity.fetch(`*[_type=="portfolio" && slug.current=="${params?.id}"][0]`)
    let images: string[] = []
    project.images.map(image => {
        if (image.imageName.includes("PLP")) {
        } else {
            images.push(imageUrlBuilder(sanity).image(image).url())
        }
    })

    return {
        props: {
            project,
            images
        }
    }
}


//****this needs to be adjusted...I don't believe we need a sanity grab here can be replaced above
export async function getStaticPaths() {
    
    const slugs: string[] = await sanity.fetch('*[_type == "portfolio"].slug.current')
    const paths = getAllPostIds(slugs)
    
    return {
      paths,
      fallback: false // false or 'blocking'
    };
}

const Project = (props: Props) => {

    const [imageIterator,setImageIterator] = useState(0)
    const [image, setImage] = useState<string>()
    const [initialPosition, setInitialPosition] = useState(0)

    const imageArray: string[] = props.images
    
    //on drag start, grabs the inital position on the page of the x-axis
    const positionLocator = (info: PanInfo) => {
        setInitialPosition(info.point.x)
    }


    //will only trigger once the gallery drags
    const onDrag = (info: PanInfo) => {
        //if the image is dragged to the left and is last of stack
        if (initialPosition > info.point.x && image === imageArray[props.images.length-1]) {
            setImageIterator(0)
        //if image is dragged left but isn't last of stack
        } else if (initialPosition > info.point.x && image !== imageArray[props.images.length-1]) {
            //grab the last index value of the array
            setImageIterator(imageIterator+1)
        //if image is dragged right and is first in stack
        } else if (initialPosition < info.point.x && image === imageArray[0]){
            setImageIterator(props.images.length-1)
        //if image is dragged right and isn't end of stack
        } else if (initialPosition < info.point.x && image !== imageArray[0]) {
            setImageIterator(imageIterator-1)
        }
    }

    //Once the iterator changes, change the image
    useEffect(()=> {
        setImage(imageArray[imageIterator])
    },[imageIterator])
    

    //once the array changes, we set the image to the first image in the stack
    useEffect(() => {
        setImage(imageArray[0])
    },[])


    return(
        <div id='port' className="pt-10 bg-black lg:pb-10">
            <div className='flex col-span-2 justify-left items-center ml-32 sm:ml-2 sm:mb-3'>
                <a className='font-oswald text-white font-bold text-7xl sm:text-3xl' href={props.project.projectURL} target="_blank" rel="noreferrer">{props.project.projectName}</a>
                <a className='font-oswald mx-3 flex' href={props.project.gitURL} target="_blank" rel="noreferrer">
                  <Image className="invert" src="/github.png" width={props.githubWidth} height={props.githubHeight} layout="fixed" />
                </a>
            </div>
            <div className="grid justify-center lg:pt-10 sm:pt-5 sm:mx-2 overflow-hidden">
                <motion.div className="lg:px-96" drag="x" dragConstraints={{ left: 0, right: 0 }} onDragStart={(event, info) => positionLocator(info)} onDragEnd={(event, info) => onDrag(info)}>
                    <Image className="border-white sm:border-8 sm:h-96" width={props.imageWidthPDP} height={props.imageHeightPDP} src={image ? image : "/github.png"} layout='intrinsic' />
                </motion.div> 
            </div>
            <div className="flex flex-row justify-center w-max mx-auto sm:mt-4">
                {props.images?.map((imageString,index) => {
                    if (imageString === image && props.screenWidth === 'mobile') {
                        return(
                            <p className="text-white sm:mx-2 sm:text-xs">&#11044;</p>
                        )
                    } else if (imageString === image && props.screenWidth === 'desktop') {
                        return(
                            <p className="text-white lg:mx-4 sm:text-xs">&#11044;</p>
                        )
                    } else {
                        return(
                            <button onClick={()=> setImageIterator(index)} className="text-white lg:mx-4 sm:mx-2 sm:text-xs">&#9675;</button>
                        )
                    }
                })}
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-row justify-center mx-auto lg:mt-10 lg:px-32 sm:mt-4">
                {props.project.shortDescription?.map(description => {
                    return(
                        <motion.div key={description.children[0].text} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                            <p className="font-oswald text-white lg:text-3xl sm:mx-2 sm:text-xl text-center">{description.children[0].text}</p>
                        </motion.div>
                    )
                })}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-row flex-wrap w-screen lg:mt-10 lg:px-32 sm:mt-4">
                <p className="font-oswald italic text-white underline lg:text-5xl sm:mx-2 sm:text-2xl text-center w-screen">Features</p>
                {props.project.features?.map(feature => {
                    return(
                        <motion.div key={feature.children[0].text} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                            <p className="font-oswald text-white text-left lg:text-2xl lg:my-5 sm:my-2 sm:mx-2 sm:px-2 sm:text-xl">{feature.children[0].text}</p>
                        </motion.div>
                    )
                })}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-row flex-wrap justify-center w-screen mx-auto lg:mt-10 lg:px-32 sm:mt-4">
                <p className="font-oswald italic text-white underline lg:text-5xl sm:mx-2 sm:text-2xl text-center w-screen">Technology</p>
                {props.project.technology?.map(technology => {
                    return(
                        <motion.div key={technology.children[0].text} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                            <p className="font-oswald text-white text-center lg:text-2xl lg:my-5 lg:mx-5 sm:my-2 sm:mx-2 sm:text-xl">{technology.children[0].text}</p>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
        
    )

}

export default Project