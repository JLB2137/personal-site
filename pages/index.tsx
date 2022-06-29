import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import sanity from '../client';
import imageUrlBuilder from '@sanity/image-url';
import { motion } from "framer-motion";

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
  return (
    <div className='flex flex-col absolute top-0'>
      <img className="block brightness-75 h-screen w-screen" src={props.screenWidth && props.screenWidth === 'mobile' ? props.backgroundImages[1] : props.backgroundImages[0]}/>
      <div className='flex absolute top-0 text-white text-5xl h-screen w-full z-9 justify-center'>
        <h1 className='self-center'><a href='#about-me'>ABOUT MEE</a></h1>
      </div>
      <div className='flex flex-col bg-black text-white z-10 text-center content-center'>
        <motion.div key="fullName" initial={initial} whileInView={final} viewport={viewport} transition={duration}>
          <h1 className='text-white font-bold text-7xl sm:text-3xl'>Jeremee Louis Bornstein</h1>
        </motion.div>
        <motion.div key="companyName" initial={initial} whileInView={final} viewport={viewport} transition={duration}>
          <h1 className='text-white text-5xl sm:text-2xl underline'><a target="_blank" rel="noreferrer" href='https://www.sonos.com/home'>Sonos, Inc.</a></h1>
        </motion.div>
        <motion.div key="jobDescription" initial={initial} whileInView={final} viewport={viewport} transition={duration}>
          <h1 className='text-white italic text-3xl sm:text-xl'>eCommerce QA Specialist</h1>
        </motion.div>
        <motion.div key="aboutMeSection" initial={initial} whileInView={final} viewport={viewport} transition={duration}>
          <p className='flex justify-center self-center lg:text-2xl sm:px-2 sm:text-xl text-center lg:py-5 lg:px-5 sm:py-2 sm:px-2' id='about-me'>
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
