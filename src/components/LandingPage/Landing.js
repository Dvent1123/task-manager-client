import React from 'react'
import { Link } from 'react-router-dom'
import mainLandingImage from '../../assets/main_image.svg'
import tasksImage from '../../assets/tasks.svg'
import landinglogo from '../../assets/logo512.jpg'
import { AiTwotoneMail } from "react-icons/ai";

const Landing = () => {
    return (
        <div className="wrapper-main">
            <div className="container-main">
                <div className="nav-main">
                    <div className="logo-main">
                        <img src={landinglogo} alt="logo" />
                    </div>
                    <nav>
                        <div className="nav-landing-button-container">
                                <div className="nav-landing-links">
                                    <Link className='nav-login-link' to="/login">Login</Link>
                                </div>                           
                        </div>
                        <button className="nav-register-links">
                                <Link className='nav-register-link' to="/register">Register</Link>
                        </button>
                    </nav>
                </div>
                <section className="banner">
                    <div className="banner-landing-image">
                        <img src={mainLandingImage} alt="teamwork" />
                    </div>
                    <div className="banner-text">
                        <div className="grouped-words">
                            <h3>Invest <span className='bigger'> 10% </span>less time</h3>
                        </div>
                        <h2>Create A Real Time Office <br/> For You and Your Team</h2>
                        <p>Have you ever needed somewhere convenient to manage everything?
                            Register now for free and instant organization!
                        </p>
                    </div>
                </section>
                <section className="page-wrapper">
                    <div className="page-container">
                        <div className="page-header">
                            <h2>How it works</h2>
                            <h4>Sign up and easily add users to your project. Start receiving real-time data
                                and notifications. Have users complete tasks and have continous production.
                            </h4>
                        </div>
                        <div className="page-content-container">
                            <div className="page-content-center">
                                <div className="couple-reasons-container">
                                    <div className="reasons-container">
                                        <div className="number-container">
                                            <h1>1</h1>
                                        </div>
                                        <h3>Sign up</h3>
                                        <p>Register easily through the registration portal or better yet, 
                                            right on this page! </p>
                                    </div>
                                <div className="reasons-container">
                                    <div className="number-container">
                                        <h1>2</h1>
                                    </div>
                                    <h3>Add Users</h3>
                                    <p>Create a user after you login, send them their username and password
                                        so they can login and begin working.</p>
                                </div>
                                </div>
                                <div className="couple-reasons-container">
                                    <div className="reasons-container">
                                            <div className="number-container">
                                                <h1>3</h1>
                                            </div>
                                            <h3>Create Task</h3>
                                            <p>Create a task to be completed, give it a name and a description
                                                so your users know what to do!
                                            </p>
                                        </div>
                                        <div className="reasons-container">
                                            <div className="number-container">
                                                <h1>4</h1>
                                            </div>
                                            <h3>Assign Task</h3>
                                            <p>Assign the task to any user in your project, this will appear in their
                                                task list so they will know what they have to do. </p>
                                        </div>
                                </div>
                                <div className="couple-reasons-container">
                                    <div className="reasons-container">
                                        <div className="number-container">
                                            <h1>5</h1>
                                        </div>
                                        <h3>Manage Task</h3>
                                        <p>Easily manage your tasks with the ability to create, edit, and delete any
                                            task at any time. </p>
                                    </div>
                                    <div className="reasons-container">
                                        <div className="number-container">
                                            <h1>6</h1>
                                        </div>
                                        <h3>Approve Task</h3>
                                        <p>Wait for your team members to complete tasks and then easily change
                                            their status so your team members know when they are all caught up! </p>
                                    </div>
                                </div>
                            </div>
                            <div className="page-image-container">
                                <img className='page-image' src={tasksImage} alt="file-w-people" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="footer">
                    <footer>
                        <div className="site-logo">
                            <img src={landinglogo} alt="site logo" />
                            <h1>Todo Simply</h1>
                        </div>
                        <div className="section-links">
                            <div className="left-links">
                                <h4>Sections</h4>
                                <div className="nav-landing-links">
                                    <Link className='nav-login-link' to="/login">Login</Link>
                                </div>
                                <div className="nav-landing-links">
                                    <Link className='nav-register-link' to="/register">Register</Link>
                                </div>                               
                            </div>
                            <div className="right-links">
                                <h4>Contact Us</h4>
                                <div className="email-container">
                                    <AiTwotoneMail className='email-icon' style={{color:'#2f2e41'}}/>
                                    <p>ventura.daniel36@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </footer>
                </section>
            </div>
        </div>
    )
}

export default Landing
