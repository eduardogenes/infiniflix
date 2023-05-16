import {Link} from 'react-router-dom'
import "./NavBar.css"

const NavBar = () => {
  return (
    <nav>
        {/* <a href="" ></a> */}
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
    </nav>
  )
}

export default NavBar