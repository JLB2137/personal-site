import { useEffect, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import imageUrlBuilder from '@sanity/image-url'
import sanity from '../../../client';

interface propsType {
    screenWidth: number,
    plantSelector: string,
    setPlantSelector: (plant:string) => void
}



const Plant = (props:propsType) => {


    interface types {
        imageIterator: number,
        setImageIterator: (imageIterator: number) => void,
        imageArray: string,
        image: string,
        setImage: (image: string) => void,
        initalPosition: number,
        setInitialPosition: (initialPosition: number) => void
    }

    const [imageIterator,setImageIterator] = useState(0)
    const [imageArray,setImageArray] = useState([])
    const [image, setImage] = useState()
    const [initialPosition, setInitialPosition] = useState(0)
    const [plant,setPlant] = useState()
    
    //builds the sanity URL for use with image tag
    const urlBuilder = async () => {
        const newPlant = await sanity.fetch(`*[_type=="plants" && name=="${props.plantSelector}"]`)
        setPlant(newPlant[0])
    }
    
    //on drag start, grabs the inital position on the page of the x-axis
    const positionLocator = (info: PanInfo) => {
        setInitialPosition(info.point.x)
    }

    //will only trigger once the gallery drags
    const onDrag = (info: PanInfo) => {
        //if the image is dragged to the left and is last of stack
        if (initialPosition > info.point.x && image === imageArray[imageArray.length-1]) {
            setImageIterator(0)
        //if image is dragged left but isn't last of stack
        } else if (initialPosition > info.point.x && image !== imageArray[imageArray.length-1]) {
            //grab the last index value of the array
            setImageIterator(imageIterator+1)
        //if image is dragged right and is first in stack
        } else if (initialPosition < info.point.x && image === imageArray[0]){
            setImageIterator(imageArray.length-1)
        //if image is dragged right and isn't end of stack
        } else if (initialPosition < info.point.x && image !== imageArray[0]) {
            setImageIterator(imageIterator-1)
        }
    }

    const imageStackBuilder = () => {
        if (plant) {
            let url = []
            plant.images.map(image => {
                url.push(imageUrlBuilder(sanity).image(image).url())
            })
            setImageArray(url)
        }
    }

    
   //on page load download the assets from Sanity
    useEffect(()=> {
        urlBuilder()
    },[])

    //Once the iterator changes, change the image
    useEffect(()=> {
        if (imageArray) {
            setImage(imageArray[imageIterator])
        }
    },[imageIterator])
    
 

    useEffect(() => {
        imageStackBuilder()
    },[plant])

    //once the array changes, we set the image to the first image in the stack
    useEffect(() => {
        setImage(imageArray[0])
    },[imageArray])


    const loaded = () => {
        return (
            <div className="pt-5">
                <div id="header" className="grid justify-center text-white">
                    <h1 className="font-bold sm:text-3xl">{plant.name}</h1>
                    <h5 className="italic sm:text-sm sm:text-center">{plant.binomial}</h5>
                </div>
                <div className="grid justify-center sm:pt-10 overflow-hidden">
                    <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} onDragStart={(event, info) => positionLocator(info)} onDragEnd={(event, info) => onDrag(info)}>
                        <img className="border-white sm:border-8 sm:h-96" src={image}/>
                    </motion.div> 
                </div>
                <div className="flex flex-row justify-center w-max mx-auto sm:mt-4">
                    {imageArray.map(imageString => {
                        if (imageString === image) {
                            return(
                                <p className="text-white sm:mx-2">&#9679;</p>
                            )
                        } else {
                            return(
                                <p className="text-white sm:mx-2">&#9675;</p>
                            )
                        }

                    })}
                </div>
                
            </div>
    
            
            
             
        )
    }

    const loading = () => {
        return(
            <h1>Loading</h1>
        )
    }

    return imageArray.length > 0 ? loaded() : loading()
    
  }

  export default Plant