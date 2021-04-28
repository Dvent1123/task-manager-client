import React, {useState } from 'react'
import {IoCheckmarkCircleSharp} from 'react-icons/io5'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import TasksModal from './Modal/TasksModal'

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


    return (
        <section className="info-container">
            <div className="info-container-center">
                <h3 className='assigned'>Assigned To: {assignedTo} </h3>
                <button className="task-button" onClick={toggle}>Edit</button>
                <button className="task-button" onClick={removeTask}>Delete</button>
                <div className="description">
                    <h3 className='task-title'>Task: </h3>
                    <p>
                        {desc}
                    </p>
                </div>
                <IoCheckmarkCircleSharp size={'55px'}/>
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
