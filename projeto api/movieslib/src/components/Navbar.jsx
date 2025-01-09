import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi"
import '../styles/components/Navbar.css'


const Navbar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!search) {
            return
        }
        navigate(`/search?q=${search}`);
        setSearch('')//para esvaziar o campo após a busca

    }
    return (
        <nav id="navbar">
            <div className="navbar-content">
                <h2>
                    <BiCameraMovie />
                    <Link to='/'>
                        Infiniflix
                    </Link>
                </h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" 
                    placeholder='Busque um filme'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    />
                    <button type="submit">
                        <BiSearchAlt2 />
                    </button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar