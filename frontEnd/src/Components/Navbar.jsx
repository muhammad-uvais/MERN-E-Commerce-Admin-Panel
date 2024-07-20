import './../Style/navbar.css'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const auth = localStorage.getItem('user')
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('/signup')
    }

    return (
        <div className='navbar-wrapper'>
            <div className='navbar-logo'>
                <p>E-Commerce</p>
            </div>
            <div className='navbar-menu'>
                {auth ? <ul className="navbar-links">
                    <li> <Link to="/">Home</Link> </li>
                    <li><Link to="/add">Add Products</Link>  </li>
                    <li> <Link to="/profile">Products</Link> </li>
                    <li>  <Link onClick={logout} to="/signin"> Logout ({JSON.parse(auth).user.name})</Link></li>
                </ul> :

                    <ul className='navbar-signin-signup'>
                        <li> <Link to="/signup">Register</Link></li>
                        <li><Link to="/signin">Login</Link></li>
                    </ul>}

            </div>
        </div>
    );
}

export default Navbar;


