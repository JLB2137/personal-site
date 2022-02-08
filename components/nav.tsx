import Link from 'next/link'

const Nav = () => {
    return (
        <div className='Nav'>
            <Link href="/">
                <h3>Jeremee Bornstein</h3>
            </Link>
            <Link href="/devjourney">
                <h3>My Development Journey</h3>
            </Link>
            <Link href="/hobbies/plants">
                <h3>Plants</h3>
            </Link>
        </div>
    )
  }

export default Nav