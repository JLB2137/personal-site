import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect, useState} from 'react'
import Nav from '../components/nav'


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
        setPersonalImageHeight(539)
        setPersonalImageWidth(625)
        setImageHeightPDP(400)
        setImageWidthPDP(625)
        setGithubWidth(25)
        setGithubHeight(25)
      } else {
        setScreenWidth('desktop')
        setImageHeightPLP(400)
        setImageWidthPLP(625)
        setPersonalImageHeight(810)
        setPersonalImageWidth(938)
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
    <div className='bg-black'>
      <Nav 
      navOpen={navOpen}
      setNavOpen={setNavOpen}
      />
      <Component {...pageProps} personalImageWidth={personalImageWidth} personalImageHeight={personalImageHeight} screenWidth={screenWidth} imageHeightPLP={imageHeightPLP} imageWidthPLP={imageWidthPLP} imageHeightPDP={imageHeightPDP} imageWidthPDP={imageWidthPDP} githubWidth={githubWidth} githubHeight={githubHeight} />
    </div>
  )
}

export default MyApp
