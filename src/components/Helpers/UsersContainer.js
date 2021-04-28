import React, { useEffect, useState } from 'react'
import UsersModal from './Modal/UsersModal'
import ModalContainer from './Modal/ModalContainer'

const UsersContainer = ({user, socket, currentUser}) => {
    const {_id, username,roomId, job, password, role} = user
    const {isShown, toggle} = ModalContainer()
    const { username: currentUserName, role: currentUserRole } = currentUser

    const [userName, setUserName] = useState(username)
    const [newJob, setNewJob] = useState(job)
    const [newRole, setNewRole] = useState(role)
    const [disabled, setDisabled] = useState(true)

    // useEffect(() => {
    //     authorizedToChangePassword(currentUserRole, currentUserName)
    // }, [currentUserRole, currentUserName])

    // const authorizedToChangePassword = (currentName) => {
    //     if(username === currentName) {
    //         setDisabled(false)
    //     }
    // }

    const removeUser = async () => {
        const data = {
            id: _id,
            currentUser: currentUserName
        }
        socket.emit('deleteUser', data)
    }


    //where you update the tasks
    const onSubmit = (e) => {
        e.preventDefault()
        let newUser = {
                id: _id,
                username: userName,
                roomId: roomId,
                password: password,
                role: newRole,
                job: newJob,
                currentUser: currentUserName
            }

        toggle()
        socket.emit('updateUser', newUser)
    }

    return (
        <section className="info-container">
            <div className="info-container-center">
                <h3 className="task-title">Name: {username} </h3>
                <button className="task-button" onClick={toggle}>Edit</button>
                <button className="task-button" onClick={removeUser}>Delete</button>
                <div className="description">
                    <h3 className="task-title">Role: {role} </h3>
                    <h3 className="task-title">Specialty: {job}</h3>
                </div>
            </div>
                <UsersModal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                userName={userName} setUserName={setUserName}
                disabled={disabled}
                role={newRole} setRole={setNewRole}
                job={newJob} setJob={setNewJob}/>
        </section>
    )
}

export default UsersContainer
