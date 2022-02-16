import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = (props) => {
  return (
    <div className='grid grid-cols-1'>
      <img className="h-screen w-screen h-screen brightness-75 absolute top-0" src={props.screenWidth && props.screenWidth < 600 ? 'home_image_mobile.jpg' : 'home_image.jpg'}/>
    </div>
  )
}

export default Home
