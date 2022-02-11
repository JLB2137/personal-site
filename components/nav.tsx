import Link from 'next/link';
import {motion} from 'framer-motion';

interface Props {
    setNavOpen: boolean,
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



    return (
        <div>
            <div className="font-header font-light mx-10 my-5 grid grid-cols-2">
                {
                    props.navOpen ?
                    <div className='justify-start text-white font-bold'>
                        <Link href=''>
                            <a className='hover:text-neutral-500 text-6xl' onClick={()=> setDropdown()}>≡</a>
                        </Link>
                    </div>
                    :
                    <div></div>
                }
                <div className="grid justify-items-end text-white" >
                    <Link href="/">
                        <a className='text-6xl font-name'>JEREMEE</a>
                    </Link>
                    <p className='justify-items-end text-sm mr-3'>E-Commerce Specialist, Engineer, Plant Dad</p>
                </div>
                
            </div>
            <div data-ison={props.navOpen} className="switch">  
                <motion.div layout transition={spring}>
                    <div className="bg-black w-max l-max p-2.5 rounded-r-md">
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