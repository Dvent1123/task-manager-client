import React from 'react'
import {Link} from 'react-router-dom'


const Landing = () => {
    return (
        <>
            <div className="landing">
                <div className="landing-wrapper">
                    <div className="landing-content">
                        <div className="landing-title">
                            <h1>Task Manager v1</h1>
                        </div>
                        <div className="landing-links">
                             <div className="links">
                                <Link to="/login">Login</Link>
                            </div>                           
                            <div className="links">
                                <Link to="/register">Register Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing
