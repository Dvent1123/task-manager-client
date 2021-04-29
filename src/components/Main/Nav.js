import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const Nav = ({token}) => {
    let decoded = jwt_decode(token)

    const handleLogout =() => {
        sessionStorage.clear()
        window.location.href = './'
      }

    const renderNav = () => {
        return (
                <div className='nav_menu'>
                <ul>
                    <li className='nav-link'>
                        <Link to="/home">
                            Home
                        </Link>
                    </li>

                {decoded.role === 'admin' && (
                    <Fragment>
                        <li className="nav-item">
                        <Link to="/tasks" className="nav-link">Tasks</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/users" className="nav-link">Users</Link>
                        </li>
                    </Fragment>
                )}

                {decoded.role === 'User' && (
                    <Fragment>
                        <li className="nav-item">
                        <Link to="/tasks" className="nav-link">Tasks</Link>
                        </li> 
                    </Fragment>
                )}

                    <li className="nav_logout">
                        <button className='logout' onClick={handleLogout}>Logout</button>
                    </li>
            </ul>       
            </div>     
        )
    }

    return (

    <Fragment>
        {renderNav()}
    </Fragment>
    )
}

export default Nav
