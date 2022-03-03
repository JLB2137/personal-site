import Link from 'next/link';
import {motion} from 'framer-motion';

interface Props {
    setNavOpen: (navOpen: boolean) => void,
    navOpen: boolean
}


const Nav = (props: Props) => {

    const setDropdown = () => {
        props.navOpen ? props.setNavOpen(false) : props.setNavOpen(true)
        console.log(props.navOpen)
    }


    const spring = {
        delay: 1,
        x: { type: "spring", stiffness: 100 },
        default: { duration: 1 }
    };


    const hamburgerSpring = () => {
        if (props.navOpen===false){
            return({
                delay: 0,
                ease: "easeout",
                default: { duration: .5 }
            })
        } else {
            return({
                delay: 1,
                ease: "easein",
                default: { duration: 1 }
            })
        }
    }

    const fadeIn = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }

    const fadeInCheck = () => {
        if (props.navOpen===false) {
            return("hidden")
        } else {
            return("visible")
        }
    }



    return (
        <div className="relative z-10">
            <div className="grid grid-cols-2 font-header font-light lg:px-10 lg:py-5 sm:pt-5 sm:px-5">
                <div data-ison={!props.navOpen} id='hamburgerSwitch'>
                    <motion.div initial="visible" animate={fadeInCheck()} variants={fadeIn} transition={hamburgerSpring()}>
                        <div className='justify-start text-white font-bold'>
                            <Link href=''>
                                <a className='hover:text-neutral-500 text-6xl sm:text-4xl' onClick={()=> setDropdown()}>≡</a>
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <div className="grid justify-end text-white" >
                    <div className='grid w-fit'>
                        <Link href="/">
                            <a id="name" className='text-6xl font-name sm:text-4xl sm:w-fit sm:-mb-2'>JEREMEE</a>
                        </Link>
                        <p className="text-sm mx-auto sm:text-xxs">E-Commerce Specialist, Engineer, Plant Dad</p>
                    </div>
                </div>
                
            </div>
            <div data-ison={props.navOpen} id="drawerSwitch">  
                <motion.div layout transition={spring}>
                    <div className="bg-black w-max l-max p-2.5 rounded-r-md">
                        <div className='row-span-1 justify-start mb-5 text-neutral-500 font-bold'>    
                            <Link href=''>
                                <a className='hover:text-white text-4xl' onClick={()=> setDropdown()}>X</a>
                            </Link>
                        </div>
                        <div className='row-span-1 justify-center mb-2.5 mx-auto text-neutral-500 font-bold'>
                            <Link href="/portfolio">
                                <a className='hover:text-white text-base' onClick={()=> setDropdown()}>PORTFOLIO</a>
                            </Link>
                        </div>
                        <div className='row-span-1 justify-center mb-2.5 mx-auto text-neutral-500 font-bold'>
                            <Link href="/hobbies/plants">
                                <a className='hover:text-white text-base' onClick={()=> setDropdown()}>PLANTS</a>
                            </Link>
                        </div>
                        <div className='grid grid-cols-2 invert w-20 justify-center mx-auto gap-x-4'>
                            <Link href='https://www.linkedin.com/in/jeremee-bornstein/' passHref>
                                <a target="_blank"><img src='/linkedin.png' /></a>
                            </Link>
                            <Link href='https://github.com/JLB2137' passHref>
                                <a target="_blank"><img src='/github.png' /></a>
                            </Link>
                        </div>
                        <div className='row-span-1 justify-center mx-auto mt-auto mb-0 text-neutral-500 align-bottom align-text-bottom '>
                            <p className='text-white italic text-sm'>Built by Jeremee Louis Bornstein</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
        
    )
  }

export default Nav