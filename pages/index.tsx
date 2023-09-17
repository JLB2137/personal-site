import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import sanity from '../client';
import imageUrlBuilder from '@sanity/image-url';
import { motion } from "framer-motion";
import {useState,useEffect} from 'react'



interface PropsType {
  screenWidth: string,
  backgroundImages: string[],
  personalPhoto: string[],
  personalImageWidth: number,
  personalImageHeight: number,
  profilePhoto: string
}

interface ImageType {
  _key: string,
  _type: string,
  asset: {
    _ref: string,
    _type: string
  },
  imageDate: string,
  imageName: string
}

interface ImagesType {
  images: ImageType[],
  page: string,
  imageName: string
}



export async function getStaticProps() {
  //fetch plants from Sanity DB
  const backgroundImages2: ImagesType[] = await sanity.fetch('*[_type == "backgroundImages"]')
  let backgroundImages: string[] = []
  let returnedImage: string
  let profilePhoto: string = ""
  let imageName: string
  backgroundImages2.map((image) => {
    if (image.page === 'Home Page') {
      image.images.map((returnedImage) => {
        if (returnedImage.imageName === "homeImage" || returnedImage.imageName === "homeImage_mobile") {
          backgroundImages.push(imageUrlBuilder(sanity).image(returnedImage).url())
        } else {
          profilePhoto = imageUrlBuilder(sanity).image(returnedImage).url()
        }
          
      })
    }
  })
  
  return {
      //static props return server side as a prop
      props: {
          backgroundImages,
          profilePhoto
      }
  }
}

const initial = {
  opacity: 0
}
const final = {
  opacity: 1
}
const viewport = {
  once: true
}
const duration = {
  duration: 2
}

const Home = (props: PropsType) => {

  const [backgroundImage, setBackgroundImage] = useState('')
  const [backgroundImageMobile, setBackgroundImageMobile] = useState('')
  const [profileImage, setProfileImage] = useState('')
  

  return (
    <div className='flex flex-col absolute top-0'>
      <img className="block brightness-75 h-screen w-screen" src={props.screenWidth && props.screenWidth === 'mobile' ? props.backgroundImages[1] : props.backgroundImages[0]}/>
      <div className='flex absolute top-0 text-white lg:text-6xl sm:text-4xl h-screen w-full z-9 justify-center'>
        <h1 className='self-center font-oswald '><a href='#about-me'>About Me</a></h1>
      </div>
      <div className='flex flex-col bg-black text-white z-10 text-center content-center'>
        <motion.div key="fullName" initial={initial} whileInView={final} viewport={viewport} transition={duration}>
        <Image className="border-white sm:border-8 sm:h-96" width={props.personalImageWidth} height={props.personalImageHeight} src={props.profilePhoto} layout='intrinsic' />
          <h1 className='text-white font-oswald font-bold text-5xl sm:text-3xl'>Jeremee Louis Bornstein</h1>
        </motion.div>
        <motion.div key="companyName" initial={initial} whileInView={final} viewport={viewport} transition={duration}>
          <h1 className='text-white font-oswald text-3xl sm:text-2xl underline'><a target="_blank" rel="noreferrer" href='https://www.sonos.com/home'>Sonos, Inc.</a></h1>
        </motion.div>
        <motion.div key="jobDescription" initial={initial} whileInView={final} viewport={viewport} transition={duration}>
          <h1 className='text-white font-oswald italic text-1xl sm:text-xl'>eCommerce QA Specialist</h1>
        </motion.div>
        <motion.div key="aboutMeSection" initial={initial} whileInView={final} viewport={viewport} transition={duration}>
          <p className='flex font-oswald justify-center self-center lg:text-xl sm:px-2 sm:text-xl text-center lg:py-5 lg:px-5 lg:mb-10 sm:py-2 sm:px-3 sm:mb-5' id='about-me'>
            I graduated from Tufts University in 2019 with a Bachelors in Science in Biomedical Engineering.
            Since then I have used my engineering skills to pursue my passions including my transition into web development.
            I spent September 2021 through April 2022 taking the General Assembly Full-Stack Web Development to get acquianted
            with the latest tools and frameworks. I spend my free time building web apps
            to help solve problems inlcuding tracking investments and watering my plants!
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Home
