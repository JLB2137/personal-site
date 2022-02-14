import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = (props) => {
  return (
    <div className='grid grid-cols-1'>
      <img id="homePageImage" className="lg:fixed lg:top-0 brightness-75 sm:fixed sm:top-0" src={props.screenWidth && props.screenWidth < 640 ? 'home_image_mobile.jpg' : 'home_image.jpg'}/>
      <h1>Jeremee Bornstein</h1>
      <h3>E-Commerce, Engineer... Plant Dad</h3>
    </div>
  )
}

export default Home
