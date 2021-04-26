import React, {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import useToken from '../../utils/useToken'
import jwt_decode from 'jwt-decode'

const Nav = ({token}) => {
    let decoded = jwt_decode(token)

    const handleLogout =() => {
        sessionStorage.clear()
        window.location.href = './'
      }

    console.log(decoded)

    const nav = () => {
        return (
                <ul>
                    <li className='nav-link'>
                        <Link to="/">
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

                {decoded.role === 'user' && (
                    <Fragment>
                        <li className="nav-item">
                        <Link to="/tasks" className="nav-link">Tasks</Link>
                        </li> 
                    </Fragment>
                )}

                    <li>
                        <button className='logout' onClick={handleLogout}>Logout</button>
                    </li>

            </ul>            
        )
    }

    return (

    <Fragment>
        {nav()}
    </Fragment>
    //     <div className="home-container">
    //         <div className="nav-container">
    //         <ul className="nav-inner">
    //             <li className="nav-item">
    //             <Link to="/tasks" className="nav-link">Tasks</Link>
    //             </li>
    //             <li className="nav-item">
    //             <Link to="/users" className="nav-link">Users</Link>
    //             </li>
    //         </ul>
    //         </div>
    //     </div>
    )
}

export default Nav
