import React from 'react'
import { Link } from 'react-router-dom'
import mainLandingImage from '../../assets/main_image.svg'
import tasksImage from '../../assets/tasks.svg'
import settingsImage from '../../assets/settings.svg'
import landinglogo from '../../assets/logo512.png'
import { VscTools, VscGraph } from "react-icons/vsc";

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
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Vel sed odit doloremque incidunt fugiat ducimus quidem fugit dolore veniam quos
                        </p>
                    </div>
                </section>
                <section className="page-wrapper">
                    <div className="page-container">
                        <div className="page-header">
                            <h2>How it works</h2>
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit laudantium
                                dolorem labore atque nemo exercitationem ipsum? Ad cupiditate officiis,</h4>
                        </div>
                        <div className="page-content-container">
                            <div className="page-content-center">
                                <div className="reasons-container">
                                    <div className="number-container">
                                        <h1>1</h1>
                                    </div>
                                    <h3>Sign up</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                                        Perferendis veritatis reiciendis doloribus </p>
                                </div>
                            </div>
                            <div className="page-image-container">
                                <img className='page-image' src={tasksImage} alt="file-w-people" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Landing
