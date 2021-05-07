import React, {useState } from 'react'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import TasksModal from './Modal/TasksModal'
import TrashIcon from '../../assets/trash.svg'
import EditIcon from '../../assets/edit.svg'


const TasksContainer = ({task,users, socket, userName}) => {
    const {assignedTo,roomId, desc, status,createdBy, _id} = task
    const {isShown, toggle} = ModalContainer()

    const [taskAssignedTo, setTaskAssignedTo] = useState(assignedTo)
    const [taskStatus, setTaskStatus] = useState(status)
    const [taskDesc, setTaskDesc] = useState(desc)


    const removeTask = async() => {
        const data = {
            id: _id,
            userName: userName
        }

        socket.emit('deleteTask', data)
    }

    //where you update the tasks
    const onSubmit = (e) => {
        e.preventDefault()
        
        const newTask = {
            id: _id,
            createdBy: createdBy,
            roomId: roomId,
            assignedTo: taskAssignedTo,
            status: taskStatus,
            desc: taskDesc,
            userName: userName
        }

        socket.emit('updateTask' , newTask)
        toggle()
    }

    const encodeStatus = (statusAsNumber) => {
        if(statusAsNumber === 1) {
            return "Not Complete"
        }
        if(statusAsNumber === 2) {
            return "In Progress"
        }
        return "Pending Approval"
    }

    return (
        <section className="info-container">
            <div className="info-container-center">
                <h4 className='assigned'>{assignedTo} </h4>
                <div className="divider-task-title"> | </div>
                <div className="tasks-description">
                    <p>
                        {desc}
                    </p>
                </div>
                <div className="divider-task-title"> | </div>
                <h3 id="task-status" className='assigned'>{encodeStatus(status)} </h3>
                <button className="task-button" onClick={toggle}>
                    <img id="info-button-pictures" src={EditIcon} alt="Edit Button | Pen on paper"/>
                </button>
                <button className="task-button" id="delete-task-button" onClick={removeTask}>
                    <img id="info-button-pictures" src={TrashIcon} alt="Delete Button | Trashcan"/>
                </button>

            </div>
                <TasksModal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                assignedTo={taskAssignedTo} setAssignedTo={setTaskAssignedTo}
                users={users} createdBy={createdBy}
                desc={taskDesc} setDesc={setTaskDesc}
                status={taskStatus} setStatus={setTaskStatus}/>
        </section>
    )
}

export default TasksContainer
