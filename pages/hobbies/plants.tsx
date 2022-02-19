import Link from 'next/link';

const Plants = () => {
    return (
        <div>
        <div className="bg-zinc-600 absolute top-0 absolute bg-tomatoe">
            <div className="bg-zinc-600 mx-auto grid grid-rows-max grid-cols-2 sm:grid-cols-2 sm:gap-5">
                <img className="brightness-75 row-start-1 col-span-2 sm:rounded" src='/plants/tomatoe.png'/>
            </div>
        </div>
        <div className="relative grid justify-center items-center mt-10">
            <Link href='/hobbies/plants/money'>
                <button className="italic text-white border-white sm:border-4 sm:rounded-md sm:text-xl sm:p-1">Money Tree</button>
            </Link>
        </div>
        </div>

        
        
         
    )
  }

  export default Plants