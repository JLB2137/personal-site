import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className='Home'>
      <img className='absolute top-0 brightness-75' src='/home_image.jpg'/>
      <h1>Jeremee Bornstein</h1>
      <h3>Digit Commerce, Engineer... Plant Dad</h3>
    </div>
  )
}

export default Home
