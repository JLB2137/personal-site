import Image from 'next/image'
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import sanity from '../client';
import {GetStaticPropsContext} from 'next';
import {useState,useEffect} from 'react'
import {motion} from 'framer-motion';

interface Images {
  projectName: string,
  image: string,
  imageName: string
}

interface StateProps {
  projectPLPImage: Images[],
  setProjectPLPImage: (test: Images[]) => void,
}

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
  imageWidthPLP: number,
  imageHeightPLP: number,
  screenWidth: string,
  portfolio: ProjectType[]
  images: Images[],
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

interface Plants {
  plantName: string,
  image: string,
  imageName: string

}

export async function getStaticProps({params}:GetStaticPropsContext, props: Props) {
  //grab all projects from Sanity
  const sanityPlants: PlantsType[] = await sanity.fetch('*[_type == "plants"]')
  //create an images array to grab all images and create links using sanity builder
  //const [projectPLPImage,setProjectPLPImage] = useState<StateProps>([])
  let plant: Plants[] = []
  let imageString: string
  let imageName: string
  sanityPlants.map(selectedPlant => {
    //****this will need to be adjusted so that multiple images can be added for each project
    selectedPlant.images.map(image => {
      imageName = image.imageName
      imageString = imageUrlBuilder(sanity).image(image).url()

      //append to images array the projectName and the image url
      plant.push({
        plantName: selectedPlant.name,
        image: imageString,
        imageName: imageName
      })
    })
  })

  //setProjectPLPImage(images)

  return {
      props: {
          plant,
          //can be removed later once useState works
          images,
          //projectPLPImage
      }
  }
}

const Portfolio = (props: Props) => {

  const [opacityChanger, setOpacityChanger] = useState(true)
  const [projectPLPImage,setProjectPLPImage] = useState(props.images)


  useEffect(()=> {
    console.log("hook results", projectPLPImage)
  },[])
  
  
  const variants = {
    visible: {opacity: 1, display: 'grid'},
    darker: {opacity: .2},
    hidden: {opacity: 0, display: 'none'},
    appear: {display: 'grid'},
  }

  const onTap = () => {
    if (opacityChanger === true) {
      setOpacityChanger(false)
      console.log("false")
    } else {
      setOpacityChanger(true)
    }
  }


  return (
    <div className='pt-10 bg-black sm:pb-5 lg:flex lg:flex-wrap'>
      <div className='justify-left text-white lg:w-full lg:ml-32 sm:ml-5'>
        <h1 className="font-bold lg:text-7xl sm:text-3xl h-min">Portfolio</h1>
      </div>
      { 
        props.portfolio.map(project => {
          //this is a placeholder value to declare something before it is updated on the render
          let imageIndex: number = 0

          projectPLPImage.map((image,index) => {
            //If viewport is mobile grab the image with mobile_PLP name
            if (props.screenWidth === 'mobile' && image.projectName === project.projectName && image.imageName === 'mobile_PLP') {
              imageIndex = index
            } else if (props.screenWidth === 'desktop' && image.projectName === project.projectName && image.imageName === 'desktop_PLP') {
              imageIndex = index
            }
          })
          return(
            <div key={project.projectName} className='justify-center mx-auto text-white lg:pt-10 sm:grid sm:grid-cols-2 sm:mt-5 sm:h-max'>
              <div className='flex relative lg:flex-wrap sm:col-span-2 sm:h-full'>
                {props.screenWidth === 'mobile' ?
                  <motion.div className='px-5' initial="visible" animate={opacityChanger ? "visible" : "darker"} variants={variants} transition={{ type: "spring", duration: 0.8 }} onTap={onTap}>
                    <div className='flex mx-auto'>
                      <Image src={projectPLPImage[imageIndex].image} width={props.imageWidthPLP} height={props.imageHeightPLP} layout="intrinsic"/>
                    </div>
                  </motion.div>

                  :

                  <motion.div className='sm:px-5' initial="visible" animate={opacityChanger ? "visible" : "darker"} variants={variants} transition={{ type: "spring", duration: 0.8 }} onHoverStart={onTap}>
                    <div className='flex mx-auto'>
                      <Image src={projectPLPImage[imageIndex].image} width={props.imageWidthPLP} height={props.imageHeightPLP} layout="intrinsic"/>
                    </div>
                  </motion.div>

                }
                {props.screenWidth === 'mobile' ?
                  <motion.div className='absolute top-0 left-0 z-10 flex-auto sm:h-full' initial="hidden" animate={opacityChanger ? "hidden" : "visible"} variants={variants} transition={{ type: "spring", duration: 1 }} onTap={onTap}>
                    <div className='flex col-span-2 mx-auto items-center lg:text-3xl lg:my-5 sm:mb-3'>
                      <a className='underline mx-auto sm:text-2xl sm:mx-1' href={project.projectURL} target="_blank" rel="noreferrer">{project.projectName}</a>
                      <a className='sm:mx-1 flex items-center' href={project.gitURL} target="_blank" rel="noreferrer">
                        <Image className="invert" src="/github.png" width={25} height={25} layout="fixed" />
                      </a>
                    </div>
                    <div className='col-span-2 flex flex-wrap justify-center mx-auto sm:my-5 sm:text-lg'>
                        {
                          project.technology.map(technology => {
                              return(
                                <p key={technology.children[0].text} className='text-white self-center sm:px-2 sm:mx-5'>{technology.children[0].text}</p>
                              )
                          })
                        }
                    </div>
                    <Link href={{
                        pathname: `/portfolio/[id]`,
                        query: {id: project.slug.current}
                        }} key={project.slug.current}>
                        <div className='flex col-span-2'>
                          <button className="italic text-white border-white mx-auto self-end hover:text-neutral-400 hover:border-neutral-400 sm:my-5 sm:w-40 sm:border-2 sm:rounded-full sm:text-xl">Learn More</button>
                        </div>
                    </Link>
                  </motion.div>

                  :
                  

                  <motion.div className='absolute top-0 left-0 z-10 flex-auto lg:w-full lg:h-full sm:h-full' initial="hidden" animate={opacityChanger ? "hidden" : "visible"} variants={variants} transition={{ type: "spring", duration: 1 }} onHoverEnd={onTap}>
                    <div className='flex col-span-2 mx-auto items-center lg:text-3xl sm:mb-3'>
                      <a className='underline mx-auto sm:text-2xl sm:mx-1' href={project.projectURL} target="_blank" rel="noreferrer">{project.projectName}</a>
                      <a className='sm:mx-1 flex items-center' href={project.gitURL} target="_blank" rel="noreferrer">
                        <Image className="invert" src="/github.png" width={25} height={25} layout="fixed" />
                      </a>
                    </div>
                    <div className='col-span-2 flex flex-wrap justify-center mx-auto sm:my-5 sm:text-lg'>
                        {
                          project.technology.map(technology => {
                              return(
                                <p key={technology.children[0].text} className='text-white self-center lg:text-2xl lg:px-5 sm:mx-5'>{technology.children[0].text}</p>
                              )
                          })
                        }
                    </div>
                    <Link href={{
                        pathname: `/portfolio/[id]`,
                        query: {id: project.slug.current}
                        }} key={project.slug.current}>
                        <div className='flex col-span-2'>
                          <button className="italic text-white border-white mx-auto self-end border-2 rounded-full text-3xl py-2 px-8 hover:text-neutral-400 hover:border-neutral-400 sm:my-5 sm:w-40 sm:border-2 sm:rounded-full sm:text-xl">Learn More</button>
                        </div>
                    </Link>
                  </motion.div>

                }

              </div>
            </div>
          )
        })
      }
      <div className='bg-black lg:h-screen'>
      </div>
    </div>
  )
}

export default Portfolio