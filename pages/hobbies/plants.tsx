import Link from 'next/link';
import sanity from '../../client';
import imageUrlBuilder from '@sanity/image-url';


interface ImageType {
    _key: string,
    _type: string,
    asset: {
      _ref: string,
      _type: string
    },
    imageDate: string
}

interface ImagesType {
    images: ImageType[]
}
        

interface PlantsType {
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
}

interface PropsType {
    screenWidth: string,
    plantSelector: string,
    setPlantSelector: (plant:string) => void,
    plants: PlantsType[]
    backgroundImages: string[],
}



export async function getStaticProps() {
    //fetch plants from Sanity DB
    const backgroundImage: ImagesType[] = await sanity.fetch('*[_type == "backgroundImages" && page == "Plants PLP"]{images}')
    const plants: PlantsType[] = await sanity.fetch('*[_type == "plants"]')
    let images: ImagesType = backgroundImage[0]
    let backgroundImages: string[] = []
    images.images.map(image => {
        backgroundImages.push(imageUrlBuilder(sanity).image(image).url())
    })
    return {
        //static props return server side as a prop
        props: {
            plants,
            backgroundImages
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
                <button className="italic text-white border-white hover:text-neutral-400 hover:border-neutral-400 sm:border-2 sm:rounded-full sm:text-xl sm:p-2 sm:mb-5">{plant.name}</button>
            </Link>
        )
    })

    return (
        <div>
            <div className="bg-zinc-600 absolute top-0">
                <div className="bg-zinc-600 mx-auto grid grid-rows-max grid-cols-2 sm:grid-cols-2 sm:gap-5">
                    <img className="brightness-75 row-start-1 col-span-2 sm:h-screen sm:w-screen" src={props.screenWidth && props.screenWidth === 'mobile' ? props.backgroundImages[1] : props.backgroundImages[0]}/>
                </div>
            </div>
            <div className="relative grid justify-center items-center mt-10">
                {linksToPlantPDP}
            </div>
        </div>
    )     
}

export default Plants