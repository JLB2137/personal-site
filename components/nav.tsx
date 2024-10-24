import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
    setNavOpen: (navOpen: boolean) => void,
    navOpen: boolean
}

const Nav = (props: Props) => {
    const setDropdown = () => {
        props.navOpen ? props.setNavOpen(false) : props.setNavOpen(true);
    };

    const spring = {
        delay: 1,
        x: { type: "spring", stiffness: 100 },
        default: { duration: 0.5 }
    };

    const hamburgerSpring = () => {
        if (!props.navOpen) {
            return {
                delay: 0,
                ease: "easeout",
                default: { duration: 0.25 }
            };
        } else {
            return {
                delay: 1,
                ease: "easein",
                default: { duration: 0.5 }
            };
        }
    };

    const fadeIn = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    };

    const fadeInCheck = () => (props.navOpen ? "visible" : "hidden");

    // Define animation variants for sliding, shaking, and lifting
    const slideShakeLift = {
        slide: {
            x: [0, 20, -20, 0],
            transition: { duration: 0.5, ease: 'easeInOut' }
        },
        shake: {
            x: [0, -10, 10, -10, 10, 0],
            transition: { duration: 0.5, ease: 'easeInOut' }
        },
        lift: {
            y: [0, -10, 0],
            transition: { duration: 0.5, ease: 'easeInOut' }
        }
    };

    // Randomly pick one of the animations, ensuring it's different from the current one
    const getRandomAnimation = (current: string) => {
        const keys = Object.keys(slideShakeLift);
        let newAnimation;
        do {
            newAnimation = keys[Math.floor(Math.random() * keys.length)];
        } while (newAnimation === current); // Ensure the new animation is different
        return newAnimation;
    };

    // Use state to control the current animation variant
    const [randomAnimation, setRandomAnimation] = useState(getRandomAnimation(''));

    // Handle hover to assign a random animation
    const handleMouseEnter = () => {
        setRandomAnimation(getRandomAnimation(randomAnimation));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='bg-black'
        >
            <div className="relative z-10">
                <div className="grid grid-cols-2 sm:grid-cols-6 font-header font-light lg:px-10 lg:py-5 sm:pt-5 sm:px-5">
                    <div data-ison={!props.navOpen} id='hamburgerSwitch' className='sm:col-span-1'>
                        <motion.div
                            initial="visible"
                            animate={fadeInCheck()}
                            variants={fadeIn}
                            transition={hamburgerSpring()}
                        >
                            <div className='justify-start text-white font-bold'>
                                <button className='hover:text-neutral-500 text-6xl sm:-mt-5 sm:text-6xl' onClick={setDropdown}>≡</button>
                            </div>
                        </motion.div>
                    </div>
                    <div className="grid justify-end align-middle text-white sm:col-span-5 sm:mr-2">
                        <div className='grid w-max align-middle'>
                            <Link href="/">
                                {/* Apply the motion.a component with dynamic animation */}
                                <motion.a
                                    id="name"
                                    className='font-name text-6xl sm:text-5xl sm:w-fit sm:h-fit sm:-mb-4 sm:mx-auto sm:font-name cursor-pointer'
                                    onMouseEnter={handleMouseEnter}
                                    animate={slideShakeLift[randomAnimation]} // Use the random animation variant
                                >
                                    JEREMEE
                                </motion.a>
                            </Link>
                            <p className="font-oswald text-lg mx-auto sm:text-xs">
                                E-Commerce QA Manager, Software Engineer, Plant Dad
                            </p>
                        </div>
                    </div>
                </div>
                <div data-ison={props.navOpen} id="drawerSwitch">
                    <motion.div layout transition={spring}>
                        <div className="bg-black w-max l-max p-2.5 rounded-r-md">
                            <div className='row-span-1 justify-start mb-5 text-neutral-500 font-bold'>
                                <button className='hover:text-white text-4xl' onClick={setDropdown}>X</button>
                            </div>
                            <div className='font-oswald row-span-1 justify-center mb-2.5 mx-auto text-neutral-500 font-bold'>
                                <Link href="/portfolio">
                                    <a className='hover:text-white text-base' onClick={setDropdown}>PORTFOLIO</a>
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
                            <div className='row-span-1 justify-center mx-auto mt-auto mb-0 text-neutral-500 align-bottom align-text-bottom'>
                                <p className='font-oswald text-white italic text-sm'>
                                    Jeremee Louis Bornstein
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Nav;
