import Link from 'next/link';
import {motion} from 'framer-motion';

interface Props {
    setNavOpen: (navOpen: boolean) => void,
    navOpen: boolean
}


const Nav = (props: Props) => {

    const setDropdown = () => {
        props.navOpen ? props.setNavOpen(false) : props.setNavOpen(true)
    }


    const spring = {
        delay: 1,
        x: { type: "spring", stiffness: 100 },
        default: { duration: .5 }
    };


    const hamburgerSpring = () => {
        if (props.navOpen===false){
            return({
                delay: 0,
                ease: "easeout",
                default: { duration: .25 }
            })
        } else {
            return({
                delay: 1,
                ease: "easein",
                default: { duration: .5 }
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
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .5 }} className='bg-black'>
            <div className="relative z-10">
                <div className="grid grid-cols-2 sm:grid-cols-6 font-header font-light lg:px-10 lg:py-5 sm:pt-5 sm:px-5">
                    <div data-ison={!props.navOpen} id='hamburgerSwitch' className='sm:col-span-1'>
                        <motion.div initial="visible" animate={fadeInCheck()} variants={fadeIn} transition={hamburgerSpring()}>
                            <div className='justify-start text-white font-bold'>
                                <button className='hover:text-neutral-500 text-6xl sm:-mt-5 sm:text-6xl' onClick={()=> setDropdown()}>≡</button>
                            </div>
                        </motion.div>
                    </div>
                    <div className="grid justify-end align-middle text-white sm:col-span-5 sm:mr-2" >
                        <div className='grid w-max align-middle'>
                            <Link href="/">
                                <a id="name" className='font-oswald text-6xl font-name sm:text-5xl sm:w-fit sm:h-fit sm:-mb-4 sm:mx-auto sm:font-name'>JEREMEE</a>
                            </Link>
                            <p className="font-oswald text-lg mx-auto sm:text-xs">E-Commerce Specialist, Engineer, Plant Dad</p>
                        </div>
                    </div>
                    
                </div>
                <div data-ison={props.navOpen} id="drawerSwitch">  
                    <motion.div layout transition={spring}>
                        <div className="bg-black w-max l-max p-2.5 rounded-r-md">
                            <div className='row-span-1 justify-start mb-5 text-neutral-500 font-bold'>    
                                <button className='hover:text-white text-4xl' onClick={()=> setDropdown()}>X</button>
                            </div>
                            <div className='font-oswald row-span-1 justify-center mb-2.5 mx-auto text-neutral-500 font-bold'>
                                <Link href="/portfolio">
                                    <a className='hover:text-white text-base' onClick={()=> setDropdown()}>PORTFOLIO</a>
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
                                <p className='font-oswald text-white italic text-sm'>Jeremee Louis Bornstein</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
        
    )
  }

export default Nav


//<div className='row-span-1 justify-center mb-2.5 mx-auto text-neutral-500 font-bold'>
    //<Link href="/hobbies/plants">
        //<a className='hover:text-white text-base' onClick={()=> setDropdown()}>PLANTS</a>
    //</Link>
//</div>