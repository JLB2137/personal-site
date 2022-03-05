import Image from 'next/image'

const Portfolio = () => {
    return (
      <div className='Development'>
        <div className='flex justify-center text-white font-bold sm:mt-5 sm:text-3xl'>
          <h1>Portfolio</h1>
        </div>

        <div className='grid grid-cols-2 justify-center mx-auto text-white'>
          <a href="https://jlb2137.github.io/" target="_blank" rel="noreferrer"><h1>Giphy Search Engine!</h1></a>
          <a href="https://github.com/JLB2137/Giphy-API-Project" target="_blank" rel="noreferrer"><Image className="invert" src="/github.png" width={25} height={25} layout="intrinsic" /></a>
          <Image className='col-span-2' src="/mobile/projects/giphy-search-engine.png" width={658} height={398} layout="intrinsic" />
        </div>
      </div>
    )
  }

export default Portfolio