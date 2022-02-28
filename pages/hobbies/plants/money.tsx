import { useRef, useEffect, useState } from "react";
import { motion, PanInfo } from "framer-motion";


const Money = () => {


    interface types {
        imageIterator: number,
        setImageIterator: (imageIterator: number) => void,
        imageArray: string,
        image: string,
        setImage: (image: string) => void,
        initalPosition: number,
        setInitialPosition: (initialPosition: number) => void
      }

    const constraintsRef = useRef(null);
    const [imageIterator,setImageIterator] = useState(0)
    const imageArray = ['/plants/money/money_1.png','/plants/money/money_2.png','/plants/money/money_3.png']
    const [image, setImage] = useState(imageArray[0])
    const [initialPosition, setInitialPosition] = useState(0)
    
    
    const positionLocator = (info: PanInfo) => {
        setInitialPosition(info.point.x)
    }

    const onDrag = (info: PanInfo) => {
        console.log("iterator",imageIterator)
        //if the image is dragged to the left and is last of stack
        if (initialPosition > info.point.x && image === imageArray[imageArray.length-1]) {
            setImageIterator(0)
            console.log('first')
        //if image is dragged left but isn't last of stack
        } else if (initialPosition > info.point.x && image !== imageArray[imageArray.length-1]) {
            //grab the last index value of the array
            setImageIterator(imageIterator+1)
            console.log('second')
        //if image is dragged right and is first in stack
        } else if (initialPosition < info.point.x && image === imageArray[0]){
            setImageIterator(imageArray.length-1)
            console.log('third')
        //if image is dragged right and isn't end of stack
        } else if (initialPosition < info.point.x && image !== imageArray[0]) {
            setImageIterator(imageIterator-1)
            console.log('fourth')
        }
        console.log("iteratorUpdated",imageIterator)
        console.log(imageArray[imageIterator]) 
    }


    useEffect(()=> {
        setImage(imageArray[imageIterator])
    },[imageIterator])  

    return (
        <div className="pt-14">
            <div id="header" className="grid justify-center text-white">
                <h1 className="font-bold sm:text-3xl">Money Tree</h1>
                <h5 className="italic sm:text-sm sm:text-center">Pachira aquatica</h5>
            </div>
            <div className="grid justify-center sm:pt-10">
                <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} onDragStart={(event, info) => positionLocator(info)} onDragEnd={(event, info) => onDrag(info)}>
                    <img className="border-white sm:border-8 sm:h-96" src={image}/>
                </motion.div>
                
            </div>
            
        </div>

        
        
         
    )
  }

  export default Money