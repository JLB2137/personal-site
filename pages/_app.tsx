import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect, useState} from 'react'
import Nav from '../components/nav'
import { motion } from "framer-motion";


function MyApp({ Component, pageProps }: AppProps) {
  

  const [navOpen,setNavOpen] = useState(true)
  const [screenWidth, setScreenWidth] = useState('mobile')
  const [imageHeightPLP, setImageHeightPLP] = useState(0)
  const [imageWidthPLP, setImageWidthPLP] = useState(0)
  const [imageWidthPDP, setImageWidthPDP] = useState(0)
  const [imageHeightPDP, setImageHeightPDP] = useState(0)
  const [githubWidth, setGithubWidth] = useState(0)
  const [githubHeight, setGithubHeight] = useState(0)
  const [personalImageHeight,setPersonalImageHeight] = useState(0)
  const [personalImageWidth,setPersonalImageWidth] = useState(0)

  const grabScreenWidth = () => {
    try {
      if (window.screen.availWidth < 600) {
        setScreenWidth('mobile')
        setImageHeightPLP(867)
        setImageWidthPLP(587)
        setPersonalImageHeight(275)
        setPersonalImageWidth(275)
        setImageHeightPDP(400)
        setImageWidthPDP(625)
        setGithubWidth(25)
        setGithubHeight(25)
      } else {
        setScreenWidth('desktop')
        setImageHeightPLP(400)
        setImageWidthPLP(625)
        setPersonalImageHeight(400)
        setPersonalImageWidth(400)
        setImageHeightPDP(600)
        setImageWidthPDP(938)
        setGithubWidth(75)
        setGithubHeight(75)
      }
    }
    catch {

    }
  }

  useEffect(()=> {
    grabScreenWidth()
  },[])

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
      <Nav 
      navOpen={navOpen}
      setNavOpen={setNavOpen}
      />
      <Component {...pageProps} personalImageWidth={personalImageWidth} personalImageHeight={personalImageHeight} screenWidth={screenWidth} imageHeightPLP={imageHeightPLP} imageWidthPLP={imageWidthPLP} imageHeightPDP={imageHeightPDP} imageWidthPDP={imageWidthPDP} githubWidth={githubWidth} githubHeight={githubHeight} />
      </motion.div>
    </div>
  )
}

export default MyApp
