import Link from 'next/link';
import sanity from '../../client';
import { useEffect, useState } from "react";
interface screenWidthProp {
    screenWidth: number
}

const Plants = (props: screenWidthProp) => {

    const [plants,setPlants] = useState()

    
    useEffect(async () => {
        setPlants(await sanity.fetch('*[_type == "plants"]'))
        console.log(await plants)

    },[])




    const loaded = () => {

        const linksInput = plants.map(plant => {

            console.log(plants)

            return(
                <Link href='/hobbies/plants/[id]' as={`/hobbies/plants/${plant.slug.current}`}>
                    <button className="italic text-white border-white hover:text-neutral-400 hover:border-neutral-400 sm:border-4 sm:rounded-md sm:text-xl sm:p-1 sm:mb-5">{plant.name}</button>
                </Link>
            )
        })

        return (
            <div>
                <div className="bg-zinc-600 absolute top-0">
                    <div className="bg-zinc-600 mx-auto grid grid-rows-max grid-cols-2 sm:grid-cols-2 sm:gap-5">
                        <img className="brightness-75 row-start-1 col-span-2 sm:h-screen sm:w-max" src={props.screenWidth && props.screenWidth < 600 ? '/plants/tomatoe_mobile.png' : '/plants/tomatoe.png'}/>
                    </div>
                </div>
                <div className="relative grid justify-center items-center mt-10">
                    <Link href='/hobbies/plants/money'>
                        <button className="italic text-white border-white hover:text-neutral-400 hover:border-neutral-400 sm:border-4 sm:rounded-md sm:text-xl sm:p-1 sm:mb-5">Money Tree</button>
                    </Link>
                    <Link href='/hobbies/plants/palm'>
                        <button className="italic text-white border-white hover:text-neutral-400 hover:border-neutral-400 sm:border-4 sm:rounded-md sm:text-xl sm:p-1 sm:mb-5">Ponytail Palm</button>
                    </Link>
                    {linksInput}
                </div>
            </div>
        )
    }

    const loading = () => {
        return(
            <h1>Loading</h1>
        )
    }


    return plants ? loaded() : loading()

        
        

  }

  export default Plants