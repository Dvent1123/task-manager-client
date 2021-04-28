import React from 'react'
import ReactDom from 'react-dom'

const UsersModal = ({isShowing, hide, onSubmit, 
    userName, setUserName,
    password, setPassword,
    role, setRole,
    disabled,
    job, setJob}) => isShowing ? ReactDom.createPortal(
    <> 
        <div className="modal-overlay">
            <div className="modal-wrapper" tabIndex={-1} aria-modal aria-hidden  role="dialog">
                <div className="modal">
                    <div className="modal-header">
                        <button className="modal-close-button" onClick={hide} type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>                  
                    <form className='modal-form' onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input className='option-styling' id="username" value={userName} onChange={(e)=> setUserName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className='option-styling' id="password" value={password} onChange={(e)=> setPassword(e.target.value)} disabled={disabled}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="job">Job</label>
                            <input className='option-styling' id="job" value={job} onChange={(e)=> setJob(e.target.value)}/>
                        </div>
                        {/* This can stay for now but gonna have to get values from database */}
                        <div className="form-group">
                            <label htmlFor="role">Security Role: </label>
                            <select className='option-styling' id="role" value={role} onChange={(e)=> setRole(e.target.value)}>
                                <option className='option-styling' value="user">User</option>
                                <option className='option-styling' value="admin">Admin</option>
                            </select>    
                        </div>        
                        <div className="form-group">
                            <button className="task-button" type="submit">
                            Submit
                            </button>
                        </div>

                        </form>
                </div>
            </div>
        </div>
    </>, document.body
) : null;

export default UsersModal
