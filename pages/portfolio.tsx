import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url';
import sanity from '../client';
import {GetStaticPropsContext} from 'next';
import {useEffect} from 'react'

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


  return {
      props: {
          portfolio,
          images
      }
  }
}

const Portfolio = (props: PropsType) => {

  

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
              <img className='col-span-2' src={projectImage} />
              <p className='col-span-2' >{project.shortDescription[0].children[0].text}</p>
              <p className='col-span-2 mx-auto my-1 font-semibold'>Technologies:</p>
              <div className='col-span-2 flex flex-wrap justify-center mx-auto'>
                {
                  project.technology.map(technology => {
                      return(
                        <p className='mx-5 my-1'>{technology.children[0].text}</p>
                      )
                  })
                }
                </div>
            </div>
          )
        })
      }

      </div>
    )
  }

export default Portfolio