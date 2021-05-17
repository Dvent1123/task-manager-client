import React from 'react'
import ReactDom from 'react-dom'

const TasksModal = ({isShowing, hide, onSubmit, 
    assignedTo, setAssignedTo, 
    desc, setDesc,
    users, createdBy,
    status, setStatus}) => isShowing ? ReactDom.createPortal(
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
                            <label className='option-styling' htmlFor="assignedTo">Task Created By: {createdBy}</label>
                        </div>       
                        <div className="form-group">
                            <label className='label-styling' htmlFor="assignedTo">Task Assigned To: </label>
                            <select className='option-styling' value={assignedTo} onChange={(e)=> setAssignedTo(e.target.value)}>
                                <option className='option-styling' value="None">None</option>
                                {
                                            users.map((user, index) => {
                                                return <option className='option-styling' key={index} value={user}>{user}</option>
                                            })
                                }
                            </select>    
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc">Description of Task</label>
                            <textarea className='option-styling' value={desc} onChange={(e) => setDesc(e.target.value)} rows="5"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status of Tasks: </label>
                            <select className='option-styling' value={status} onChange={(e)=> setStatus(e.target.value)}>
                                <option className='option-styling' value="0">Select a Status</option>
                                <option className='option-styling' value="1">Not Complete</option>
                                <option className='option-styling' value="2">In Progress</option>
                                <option className='option-styling' value="3">Pending Approval</option>
                            </select>    
                        </div>
                        <div className="form-group">
                            <button id="modal-form-button" type="submit">
                            Submit
                            </button>
                        </div>

                        </form>
                </div>
            </div>
        </div>
    </>, document.body
) : null;

export default TasksModal
