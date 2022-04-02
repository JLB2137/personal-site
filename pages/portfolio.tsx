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
  screenWidth: string,
  portfolio: ProjectType[]
  images: Images[]
}

export async function getStaticProps({params}:GetStaticPropsContext, props: Props) {
  //grab all projects from Sanity
  const portfolio: ProjectType[] = await sanity.fetch(`*[_type=="portfolio"]`)
  //create an images array to grab all images and create links using sanity builder
  let images: Images[] = []
  let imageString: string
  let imageName: string
  portfolio.map(project => {
    //****this will need to be adjusted so that multiple images can be added for each project
    project.images.map(image => {
      imageName = image.imageName
      imageString = imageUrlBuilder(sanity).image(image).url()

      //append to images array the projectName and the image url
      images.push({
        projectName: project.projectName,
        image: imageString,
        imageName: imageName
      })
    })
  })

  return {
      props: {
          portfolio,
          images
      }
  }
}

const Portfolio = (props: Props) => {

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
    <div className='pt-10'>
      <div className='grid justify-left text-white sm:ml-12'>
        <h1 className="font-bold sm:text-3xl">Portfolio</h1>
      </div>
      { 
        props.portfolio.map(project => {
          let projectImage 
          props.images.map(image => {
            //If viewport is mobile grab the image with mobile_PLP name
            if (props.screenWidth === 'mobile' && image.projectName === project.projectName && image.imageName === 'mobile_PLP') {
              projectImage = image.image
            } else if (props.screenWidth === 'desktop' && image.projectName === project.projectName && image.imageName === 'desktop_PLP') {
              projectImage = image.image
            }
          })
          return(
            <div key={project.projectName} className='grid grid-cols-2 justify-center mx-auto sm:mt-5 text-white'>
              <div className='relative col-span-2 flex sm:h-full'>
                <motion.div initial="visible" animate={opacityChanger ? "visible" : "darker"} variants={variants} transition={{ type: "spring", duration: 0.8 }} onTap={onTap}>
                  <Image src={projectImage} width={300} height={300} layout="intrinsic"/>
                </motion.div>
                <motion.div className='absolute top-0 left-0 z-10 flex-auto sm:h-full' initial="hidden" animate={opacityChanger ? "hidden" : "visible"} variants={variants} transition={{ type: "spring", duration: 1 }} onTap={onTap}>
                <div className='flex col-span-2 mx-auto mb-3 items-center'>
                  <a className='underline sm:text-2xl sm:mx-1' href={project.projectURL} target="_blank" rel="noreferrer">{project.projectName}</a>
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
                  <div className='flex col-span-2'>
                    <Link href={{
                        pathname: `/portfolio/[id]`,
                        query: {id: project.slug.current}
                    }} key={project.slug.current}>
                        <button className="italic text-white border-white mx-auto self-end hover:text-neutral-400 hover:border-neutral-400 sm:my-5 sm:w-40 sm:border-2 sm:rounded-full sm:text-xl">Learn More</button>
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