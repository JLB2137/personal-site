import Image from 'next/image'
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import sanity from '../client';
import {GetStaticPropsContext} from 'next';
import {useState,useEffect} from 'react'
import {motion} from 'framer-motion';

interface ImagesType {
  _key: string,
  _type: string,
  asset: {
    _ref: string,
    _type: string
  },
  imageName: string
}

interface FeatureType {
  _key: string,
  _type: string,
  children: [],
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
  features: FeatureType[],
  images: ImagesType[],
  name: string,
  slug: { _type: string, current: string },
  current: string
}

interface PropsType {
  portfolio: ProjectType[]
  images: {projectName: string, image: string}
}

export async function getStaticProps({params}:GetStaticPropsContext) {
  //grab all projects from Sanity
  const portfolio: ProjectType[] = await sanity.fetch(`*[_type=="portfolio"]`)
  //create an images array to grab all images and create links using sanity builder
  let images = []
  portfolio.map(project => {
    let imageString
    project.images.map(image => {
      imageString = imageUrlBuilder(sanity).image(image).url()
    })
    //append to images array the projectName and the image url
    images.push({
      projectName: project.projectName,
      image: imageString,
    })
  })

  console.log(portfolio)


  return {
      props: {
          portfolio,
          images
      }
  }
}

const Portfolio = (props: PropsType) => {

  const [opacityChanger, setOpacityChanger] = useState(true)

  const variants = {
    visible: {opacity: 1, display: 'grid'},
    darker: {opacity: .25},
    hidden: {opacity: 0, display: 'none'},
  }

  const onTap = () => {
    if (opacityChanger === true) {
      setOpacityChanger(false)
      console.log("false")
    } else {
      setOpacityChanger(true)
    }
  }

  

  const projectLoop = () => {
    props.portfolio.map(project => {
      console.log(project)
    })
  }

  useEffect(()=> {
    projectLoop()
  },[])



    return (
      <div className='Development'>
        <div className='flex justify-center text-white font-bold sm:mt-5 sm:text-3xl'>
          <h1>Portfolio</h1>
        </div>
        
      { props.portfolio.map(project => {

          let projectImage 

          props.images.map(image => {
            if (image.projectName === project.projectName) {
              projectImage = image.image
            }
          })

          return(
            <div className='grid grid-cols-2 justify-center mx-auto text-white'>
              <div className='flex col-span-2 mx-auto mb-3 items-center'>
                <a className='mx-1' href={project.projectURL} target="_blank" rel="noreferrer">{project.projectName}</a>
                <a className='mx-1 flex items-center' href={project.gitURL} target="_blank" rel="noreferrer">
                  <Image className="invert" src="/github.png" width={25} height={25} layout="fixed" />
                </a>
              </div>
              <div className='relative col-span-2 flex sm:h-full'>
                <motion.div initial="visible" animate={opacityChanger ? "visible" : "darker"} variants={variants} transition={{ type: "spring", duration: 0.8 }} onTap={onTap}>
              
                  <img src={projectImage} />

                </motion.div>
                <motion.div className='absolute top-0 left-0 z-10 flex-auto sm:h-full' initial="hidden" animate={opacityChanger ? "hidden" : "visible"} variants={variants} transition={{ type: "spring", duration: 0.8 }} onTap={onTap}>
                  <div className='col-span-2 flex flex-wrap justify-center mx-auto sm:my-5 sm:text-xl'>
                    {
                      project.technology.map(technology => {
                          return(
                            <p className='bg-white text-black self-center sm:px-2 sm:mx-5'>{technology.children[0].text}</p>
                          )
                      })
                    }
                  </div>
                  <div className='flex col-span-2'>
                    <Link href={{
                        pathname: `/portfolio/[id]`,
                        query: {id: project.slug.current}
                    }} key={project.slug.current}>
                        <button className="italic bg-white text-black border-white mx-auto self-end hover:text-neutral-400 hover:border-neutral-400  sm:my-5 sm:w-40 sm:border-2 sm:rounded-full sm:text-2xl">Learn More</button>
                    </Link>
                  </div>
                </motion.div>
              </div>

            </div>
          )
        })
      }

      </div>
    )
  }

export default Portfolio