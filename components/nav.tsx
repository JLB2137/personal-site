import Link from 'next/link'

const Nav = () => {
    return (
        <div className="font-header font-light text-4xl grid grid-cols-3">
            <div className='justify-start'>
                <Link href="/devjourney">
                    <h3>Projects</h3>
                </Link>
            </div>
            <div>
                <Link href="/hobbies/plants">
                    <h3>Plants</h3>
                </Link>
            </div>
            <div className="font-name justify-self-end" >
                <Link href="/">
                    <h1 className="before:content-['JEREMEE'] hover:before:content-['JEREMEEEEEEE']"></h1>
                </Link>
            </div>
        </div>
    )
  }

export default Nav