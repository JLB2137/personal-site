import Link from 'next/link';
import sanity from '../../client';


interface ImagesType {
    _key: string,
    _type: string,
    asset: {
      _ref: string,
      _type: string
    },
    imageDate: string
  }

interface PlantsType {
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string,
    acquisitionDate: string,
    binomial: string,
    images: ImagesType,
    name: string,
    slug: { _type: string, current: string },
}

interface PropsType {
    screenWidth: number,
    plantSelector: string,
    setPlantSelector: (plant:string) => void,
    plants: PlantsType[]
}



export async function getStaticProps() {
    //fetch plants from Sanity DB
    const plants: PlantsType[] = await sanity.fetch('*[_type == "plants"]')
    return {
        //static props return server side as a prop
        props: {
            plants,
        }
    }
}



const Plants = (props: PropsType) => {

    const linksToPlantPDP = props.plants.map(plant => {

        return(
            <Link href={{
                pathname: `/hobbies/plants/[id]`,
                query: {id: plant.slug.current}
            }} key={plant.slug.current}>
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
                {linksToPlantPDP}
            </div>
        </div>
    )     
}

export default Plants