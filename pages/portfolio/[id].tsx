import { useEffect, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import imageUrlBuilder from '@sanity/image-url';
import sanity from '../../client';
import Image from 'next/image'
import {GetStaticPropsContext} from 'next';
  
interface ImagesType {
    _key: string,
    _type: string,
    asset: {
      _ref: string,
      _type: string
    },
    imageDate: string
}

interface ProjectType {
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string,
    completionDate: string,
    features: FeatureType[],
    images: ImagesType[],
    name: string,
    slug: { _type: string, current: string },
    current: string
}

interface PlantType {
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string,
    acquisitionDate: string,
    binomial: string,
    images: ImagesType[],
    name: string,
    slug: { _type: string, current: string },
    current: string
}

interface PropsType {
    screenWidth: number,
    plantSelector: string,
    setPlantSelector: (plant:string) => void,
    plant: PlantType,
    imageArray: string[],
    project: ProjectType,

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
    console.log(project)
    console.log(project.shortDescription[0])
    console.log(project.shortDescription[0].children[0].text)
    let imageArray: string[] = []
    project.images.map(image => {
        imageArray.push(imageUrlBuilder(sanity).image(image).url())
    })

    return {
        props: {
            project,
            imageArray
        }
    }
}


//****this needs to be adjusted...I don't believe we need a sanity grab here can be replaced above
export async function getStaticPaths() {
    
    const slugs: string[] = await sanity.fetch('*[_type == "portfolio"].slug.current')
    const paths = getAllPostIds(slugs)
    
    return {
      paths,
      fallback: true // false or 'blocking'
    };
}

const Project = (props: PropsType) => {

    const [imageIterator,setImageIterator] = useState(0)
    const [image, setImage] = useState<string>()
    const [initialPosition, setInitialPosition] = useState(0)
    
    //on drag start, grabs the inital position on the page of the x-axis
    const positionLocator = (info: PanInfo) => {
        setInitialPosition(info.point.x)
    }

    //will only trigger once the gallery drags
    const onDrag = (info: PanInfo) => {
        //if the image is dragged to the left and is last of stack
        if (initialPosition > info.point.x && image === props.imageArray[props.imageArray.length-1]) {
            setImageIterator(0)
        //if image is dragged left but isn't last of stack
        } else if (initialPosition > info.point.x && image !== props.imageArray[props.imageArray.length-1]) {
            //grab the last index value of the array
            setImageIterator(imageIterator+1)
        //if image is dragged right and is first in stack
        } else if (initialPosition < info.point.x && image === props.imageArray[0]){
            setImageIterator(props.imageArray.length-1)
        //if image is dragged right and isn't end of stack
        } else if (initialPosition < info.point.x && image !== props.imageArray[0]) {
            setImageIterator(imageIterator-1)
        }
    }

    //Once the iterator changes, change the image
    useEffect(()=> {
        setImage(props.imageArray[imageIterator])
    },[imageIterator])
    

    //once the array changes, we set the image to the first image in the stack
    useEffect(() => {
        setImage(props.imageArray[0])
    },[props.imageArray])


    return(
        <div className="pt-10 bg-black">
            <div className='flex col-span-2 justify-center mb-3 items-center'>
                <a className='text-white font-bold sm:text-3xl' href={props.project.projectURL} target="_blank" rel="noreferrer">{props.project.projectName}</a>
                <a className='mx-1 flex items-center' href={props.project.gitURL} target="_blank" rel="noreferrer">
                  <Image className="invert" src="/github.png" width={25} height={25} layout="fixed" />
                </a>
            </div>
            <div className="grid justify-center sm:pt-5 overflow-hidden">
                <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} onDragStart={(event, info) => positionLocator(info)} onDragEnd={(event, info) => onDrag(info)}>
                    <img className="border-white sm:border-8 sm:h-96" src={image}/>
                </motion.div> 
            </div>
            <div className="flex flex-row justify-center w-max mx-auto sm:mt-4">
                {props.imageArray.map(imageString => {
                    if (imageString === image) {
                        return(
                            <p className="text-white sm:mx-2 sm:text-xs">&#9679;</p>
                        )
                    } else {
                        return(
                            <p className="text-white sm:mx-2 sm:text-xs">&#9675;</p>
                        )
                    }
                })}
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-row justify-center mx-auto sm:mt-4">
                {props.project.shortDescription.map(description => {
                    return(
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                            <p className="text-white sm:mx-2 sm:text-xl text-center">{description.children[0].text}</p>
                        </motion.div>
                    )
                })}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-row flex-wrap justify-center w-screen mx-auto sm:mt-4">
                <p className="text-white underline sm:mx-2 sm:text-2xl text-center">Features</p>
                {props.project.features.map(feature => {
                    return(
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                            <p className="text-white text-center sm:my-2 sm:mx-2 sm:text-xl">{feature.children[0].text}</p>
                        </motion.div>
                    )
                })}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-row flex-wrap justify-center w-screen mx-auto sm:mt-4">
                <p className="text-white underline sm:mx-2 sm:text-2xl text-center w-screen">Technology</p>
                {props.project.technology.map(technology => {
                    return(
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                            <p className="text-white text-center sm:my-2 sm:mx-2 sm:text-xl">{technology.children[0].text}</p>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    )

}

export default Project