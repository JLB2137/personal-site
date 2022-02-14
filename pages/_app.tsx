import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect, useState} from 'react'
import Nav from '../components/nav'


function MyApp({ Component, pageProps }: AppProps) {
  


  const [navOpen,setNavOpen] = useState(true)
  const [screenWidth, setScreenWidth] = useState(0)


  const grabScreenWidth = () => {
    try {
      setScreenWidth(window.screen.availWidth)
    }
    catch {

    }
  }

  useEffect(()=> {
    grabScreenWidth()
  })

  return (
    <div>
      <Nav 
      navOpen={navOpen}
      setNavOpen={setNavOpen}
      />
      <Component {...pageProps} screenWidth={screenWidth} />
    </div>
  )
}

export default MyApp
