import React from 'react'
import {Link} from 'react-router-dom'
import '../../assets/Landing.css'


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
                        <Link to="/login"> <div className="links"> Login </div></Link>                         
                           <Link to="/register"> <div className="links"> Register Now </div></Link> 
                        </div>
                    </div>
                </div>
            </div>

                {/* <Route exact path='/register' component={Register} /> */}
        </>
    )
}

export default Landing
