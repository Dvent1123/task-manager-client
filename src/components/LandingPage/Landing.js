import React from 'react'
import { Link } from 'react-router-dom'
import mainLandingImage from '../../assets/main_image.svg'
import tasksImage from '../../assets/tasks.svg'
import settingsImage from '../../assets/settings.svg'
import { VscTools, VscGraph } from "react-icons/vsc";
const Landing = () => {
    return (
        <>
        <div className="wrapper">
            {/* LOGO WILL GO HERE */}
            <div className="container">
                <div className="landing-header">
                    <h1>Easily Manage Your Tasks <br/> Through "TaskManager"</h1>
                    <h3>
                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                        It has roots in a piece of classical Latin literature from 45 BC, 
                        making it over 2000 years old.                         
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
                        <h4>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.</h4>
                    </div>
                    <div className="how-info-container">
                        <div className="how-text-container">
                            <h3>Some Title with Words about Managing Tasks</h3>
                            <h5>Some text also with words</h5>

                            <div className="how-subtext-container">
                                <div className="how-subtext-center">
                                    <VscTools color="#F0544F" size="2em"/>                                        
                                    <div className="how-subtext-text">
                                        <h4>Some Title</h4>
                                        <p>Bunch of Words</p>
                                    </div>
                                </div>
                            </div>
                            <div className="how-subtext-container">
                                <div className="how-subtext-center">
                                    <VscGraph color="#F0544F" size="2em"/>
                                    <div className="how-subtext-text">
                                        <h4>Some Title</h4>
                                        <p>Bunch of Words</p>
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
                            <h3>Some Title with Words about Managing Users</h3>
                            <h5>Some text also with words</h5>

                            <div className="how-subtext-container">
                                <div className="how-subtext-center">
                                    <div className="how-subtext-text">
                                        <h4>Some Title</h4>
                                        <p>Bunch of Words</p>
                                    </div>
                                </div>
                            </div>
                            <div className="how-subtext-container">
                                <div className="how-subtext-center">
                                    <div className="how-subtext-text">
                                        <h4>Some Title</h4>
                                        <p>Bunch of Words</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Landing
