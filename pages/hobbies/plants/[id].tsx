import { useEffect, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import imageUrlBuilder from '@sanity/image-url'
import sanity from '../../../client';

interface propsType {
    screenWidth: number,
    plantSelector: string,
    setPlantSelector: (plant:string) => void
}


//need to get array of image URLs created before the page gets rendered
//should be able to handle this by using a use state


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
    const [imageArray,setImageArray] = useState()
    let newArray =[]
    const [image, setImage] = useState()
    const [initialPosition, setInitialPosition] = useState(0)
    const [plant,setPlant] = useState()
    const query = `*[_type=="plants" && name=="${props.plantSelector}"]`
    
    const urlBuilder = async () => {
        const newPlant = await sanity.fetch(query)
        console.log("newPlant", newPlant)
        setPlant(newPlant[0])
    }
    
    const positionLocator = (info: PanInfo) => {
        setInitialPosition(info.point.x)
    }

    //will only trigger once the 
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

    


    //used once the image is changed
    useEffect(()=> {
        if (imageArray) {
            setImage(imageArray[imageIterator])
        }
    },[imageIterator])
    
    //used when the page loads to grab URLS for images
    useEffect(()=> {
        urlBuilder()
    },[])

    useEffect(() => {
        if (plant) {
            console.log("plant", plant)
            console.log("images",plant.images)
            plant.images.map(image => {
                const url = imageUrlBuilder(sanity).image(image).url()
                console.log("url", url)
                newArray.push(url)
            })
            setImageArray(newArray)
            console.log("imageArray",imageArray)
        }
    },[plant])

    useEffect(()=> {
        if (imageArray) {
            setImage(imageArray[0])
        }
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

    return imageArray ? loaded() : loading()
    
  }

  export default Plant