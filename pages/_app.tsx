import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useState} from 'react'
import Nav from '../components/nav'


function MyApp({ Component, pageProps }: AppProps) {
  
  const [navOpen,setNavOpen] = useState(false)

  return (
    <div>
      <Nav 
      navOpen={navOpen}
      setNavOpen={setNavOpen}
      />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
