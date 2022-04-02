import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import sanity from '../client';
import imageUrlBuilder from '@sanity/image-url';

interface PropsType {
  screenWidth: string,
  backgroundImages: string[],
}

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

export async function getStaticProps() {
  //fetch plants from Sanity DB
  const backgroundImage: ImagesType[] = await sanity.fetch('*[_type == "backgroundImages" && page == "Home Page"]{images}')
  let images: ImagesType = backgroundImage[0]
  let backgroundImages: string[] = []
  images.images.map(image => {
      backgroundImages.push(imageUrlBuilder(sanity).image(image).url())
  })
  return {
      //static props return server side as a prop
      props: {
          backgroundImages
      }
  }
}

const Home = (props: PropsType) => {
  return (
    <div className='grid grid-cols-1'>
      <img className="h-screen w-screen h-screen brightness-75 absolute top-0" src={props.screenWidth && props.screenWidth === 'mobile' ? props.backgroundImages[1] : props.backgroundImages[0]}/>
    </div>
  )
}

export default Home
