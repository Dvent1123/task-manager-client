import React from 'react'
import { Link } from 'react-router-dom'
import mainLandingImage from '../../assets/main_image.svg'
import tasksImage from '../../assets/tasks.svg'
import settingsImage from '../../assets/settings.svg'
import landinglogo from '../../assets/logo512.png'
import { VscTools, VscGraph } from "react-icons/vsc";
const Landing = () => {
    return (
        <div className="wrapper">
            <div className="container">
                <div className="landing-header">
                <img id="main_logo" src={landinglogo} alt="Task Manager Logo, a simplistic scroll with a color gradiant"/>
                    <h2>Easily Manage <wbr/> Your Tasks <wbr/> With</h2> 
                    
                    <h1><em>TaskManager</em></h1>
                    <h3>
                        Have you ever wanted to have somewhere convenient to manage your tasks, employees, or just everyday
                        duties? Easily manage them all in one convenient place by registering now!
                    </h3>
                    <div className="landing-button-container">
                            <div className="landing-links">
                                <Link className='login-link' to="/login">Login</Link>
                            </div>                           
                            <div className="landing-links">
                                <Link className='register-link' to="/register">Register Now</Link>
                            </div>
                    </div>
                </div>
                <div className="landing-image-container">
                    <img src={mainLandingImage} alt="girl managing"/>
                </div>
                <div className="how-container">
                    <div className="how-header">
                        <h2>How does it work?</h2>
                        <h4>Start off by signing up and seamlessly start managing your tasks or employees.</h4>
                    </div>
                    <div className="how-info-container">
                        <div className="how-text-container">
                            <h3>Real Time Data</h3>
                            <h5>Easily update in real time</h5>

                            <div className="how-subtext-container">
                                <div className="how-subtext-center">
                                    <VscTools color="#F0544F" size="2em"/>                                        
                                    <div className="how-subtext-text">
                                        <h4>Easily Edit with Our Tools</h4>
                                        <p>Edit your tasks and users with a simple click of a button and receive real time data!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="how-subtext-container">
                                <div className="how-subtext-center">
                                    <VscGraph color="#F0544F" size="2em"/>
                                    <div className="how-subtext-text">
                                        <h4>Propel Your Efficiency</h4>
                                        <p>Propel your efficiency upwards by having one easy and convenient place for everyone
                                            to access their tasks and edit the status while always receiving immediate updates.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="how-image-container">
                            <img src={tasksImage} alt="manage tasks"/>
                        </div>
                    </div>
                    <div className="how-info-container">
                        <div className="how-image-container">
                            <img src={settingsImage} alt="manage users"/>
                        </div>
                        <div className="how-text-container">
                            <h3>Manage Users and Permissions</h3>
                            <h5>Handle your users permissions in one place</h5>

                            <div className="how-subtext-container">
                                <div className="how-subtext-center">
                                    <div className="how-subtext-text">
                                        <h4>Admins</h4>
                                        <p>Upon registration you are automatically set as the admin of your project.
                                            Add users and set their permissions to either "User" or "Admin" to allow
                                            them more or less access depending on your needs!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="how-subtext-container">
                                <div className="how-subtext-center">
                                    <div className="how-subtext-text">
                                        <h4>Users</h4>
                                        <p>Get updated on the tasks that still need to be done and what needs to 
                                            be accomplished. Edit the task to update everyone on your work and
                                            stay up to date on the whole project.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
