import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect, useState} from 'react'
import Nav from '../components/nav'


function MyApp({ Component, pageProps }: AppProps) {
  

  const [navOpen,setNavOpen] = useState(true)
  const [screenWidth, setScreenWidth] = useState('mobile')
  const [imageHeightPLP, setImageHeightPLP] = useState(0)
  const [imageWidthPLP, setImageWidthPLP] = useState(0)

  const grabScreenWidth = () => {
    try {
      if (window.screen.availWidth < 600) {
        setScreenWidth('mobile')
        setImageHeightPLP(867)
        setImageWidthPLP(587)
      } else {
        setScreenWidth('desktop')
      }
    }
    catch {

    }
  }

  useEffect(()=> {
    grabScreenWidth()
  },[])

  return (
    <div className='bg-black w-screen h-screen'>
      <Nav 
      navOpen={navOpen}
      setNavOpen={setNavOpen}
      />
      <Component {...pageProps} screenWidth={screenWidth} imageHeightPLP={imageHeightPLP} imageWidthPLP={imageWidthPLP}/>
    </div>
  )
}

export default MyApp
