import Link from 'next/link';
import {motion} from 'framer-motion';

const Nav = (props) => {

    const setDropdown = () => {
        props.navOpen ? props.setNavOpen(false) : props.setNavOpen(true)
        console.log(props.navOpen)
    }


    const spring = {
        delay: 1,
        x: { type: "spring", stiffness: 100 },
        default: { duration: 1 }
    };

    const HamburgerNav = () => {
        return( 
            <div className='justify-start ml-10 text-neutral-500 font-bold'>
                <Link href=''>
                    <a className='hover:text-black text-4xl' onClick={()=> setDropdown()}>≡</a>
                </Link>
            </div>
        )
    }


    return (
        <div>
            <div className="font-header font-light grid grid-cols-2">
                {
                    props.navOpen ?
                    <HamburgerNav />
                    :
                    <div></div>
                }
                <div className="font-name justify-self-end mr-10 text-4xl" >
                    <Link href="/">
                        <a>JEREMEE</a>
                    </Link>
                </div>
                
            </div>
            <div data-ison={props.navOpen} className="switch">  
                <motion.div layout transition={spring}>
                    <div className="bg-black w-max l-max p-2.5">
                        <div className='row-span-1 justify-start mb-5 text-neutral-500 font-bold'>    
                            <Link href=''>
                                <a className='hover:text-white text-4xl' onClick={()=> setDropdown()}>X</a>
                            </Link>
                        </div>
                        <div className='row-span-1 justify-center mb-2.5 mx-auto text-neutral-500 font-bold'>
                            <Link href="/devjourney">
                                <a className='hover:text-white text-base' onClick={()=> setDropdown()}>PROJECTS</a>
                            </Link>
                        </div>
                        <div className='row-span-1 justify-center mb-2.5 mx-auto text-neutral-500 font-bold'>
                            <Link href="/hobbies/plants ">
                                <a className='hover:text-white text-base' onClick={()=> setDropdown()}>PLANTS</a>
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