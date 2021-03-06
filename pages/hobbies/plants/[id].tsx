import { useEffect, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import imageUrlBuilder from '@sanity/image-url';
import sanity from '../../../client';
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
    screenWidth: string,
    plant: PlantType,
    imageArray: string[]

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
    const plants: PlantType[] = await sanity.fetch(`*[_type=="plants" && slug.current=="${params?.id}"]`)
    let plant: PlantType = plants[0]
    let imageArray: string[] = []
    plant.images.map(image => {
        imageArray.push(imageUrlBuilder(sanity).image(image).url())
    })

    return {
        props: {
            plant,
            imageArray
        }
    }
}

export async function getStaticPaths() {
    
    const slugs: string[] = await sanity.fetch('*[_type == "plants"].slug.current')
    const paths = getAllPostIds(slugs)
    
    return {
      paths,
      fallback: true // false or 'blocking'
    };
}



const Plant = (props:PropsType) => {

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


    const loaded = () => {
        return (
            <div className="pt-10 bg-black h-screen">
                <div id="header" className="grid justify-left text-white ml-32 sm:ml-12">
                    <h1 className="font-bold text-7xl sm:text-3xl">{props.plant.name}</h1>
                    <h5 className="italic text-5xl sm:text-sm">{props.plant.binomial}</h5>
                </div>
                <div className="flex justify-center overflow-hidden lg:w-3/12 lg:pt-10 mx-auto sm:pt-5">
                    <motion.div className="w-max h-1/2 mx-auto lg:p-10" drag="x" dragConstraints={{ left: 0, right: 0 }} onDragStart={(event, info) => positionLocator(info)} onDragEnd={(event, info) => onDrag(info)}>
                        <img className="border-white border-8 h-1/2 lg:mx-auto sm:border-8 sm:h-96" src={image}/>
                    </motion.div> 
                </div>
                <div className="flex flex-row justify-center w-max mx-auto sm:mt-4">
                    {props.imageArray.map((imageString, index) => {
                        if (imageString === image && props.screenWidth === 'mobile') {
                            return(
                                <p className="text-white sm:mx-2 sm:text-xs">&#9679;</p>
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
            </div>
        )
    }
    
    const loading = () => {
        return <h1>Loading</h1>
    }


    return props.plant ? loaded() : loading()
}


export default Plant