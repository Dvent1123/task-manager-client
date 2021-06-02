import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const QuickLinks = ({token}) => {
    let decoded = jwt_decode(token)

    const renderLinks = () => {
        return (
            <div className='quicklinks-container'>
                {decoded.role === 'admin' && (

                    <Fragment>
                      <div className="blog-card">
                        <div className="meta">
                            <div className="description-overlay">
                                <div className="description">
                                        <h1>Tasks</h1>
                                        <h2 >Actions on Tasks</h2>
                                        <div id="quicklinks_divider"> </div>
                                        <p>Create, edit, delete, and assign tasks to members of your organization. Or you can check the status of each task and update it as neccessary.</p>
                                    </div>  
                            </div> 
                            <div className="details">
                                    <li>
                                        <Link to="/tasks" >Actions on Tasks</Link>
                                    </li>
                            </div>
                        </div>
                    </div>

                    <div className="blog-card">
                        <div className="meta">
                            <div className="description-overlay">
                                <div className="description">
                                        <h1>Users</h1>
                                        <h2>Actions on Users</h2>
                                        <div id="quicklinks_divider"> </div>
                                        <p>Enjoy Admin privileges by being able to add, delete, and update users. Add users by creating an account for them and giving them the password you created (they can change this at any point).</p>
                                    </div>  
                            </div> 
                            <div className="details">
                                    <li>
                                        <Link to="/users" >Actions on Users</Link>
                                    </li>
                            </div>
                        </div>
                    </div>
                    </Fragment>

                    // <Fragment>
                    //     <li className="nav-item">
                    //     <Link to="/tasks" className="nav-link">Tasks</Link>
                    //     </li>
                    //     <li className="nav-item">
                    //     <Link to="/users" className="nav-link">Users</Link>
                    //     </li>
                    // </Fragment>
                )}

                {decoded.role === 'User' && (
                    <Fragment>
                        <div className="blog-card">
                            <div className="meta">
                                <div className="description-overlay">
                                    <div className="description">
                                            <h1>Tasks</h1>
                                            <h2>Actions on Tasks</h2>
                                            <p>Create, edit, and update tasks. Update the status of your tasks so your admin can mark them off as complete!</p>
                                        </div>  
                                </div> 
                                <div className="details">
                                        <li>
                                            <Link to="/tasks" >Actions on Tasks</Link>
                                        </li>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>       
        )
    }

    return (

    <Fragment>
        {renderLinks()}
    </Fragment>
    )
}

export default QuickLinks
