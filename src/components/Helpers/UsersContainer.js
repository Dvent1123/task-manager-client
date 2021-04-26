import React, {useState} from 'react'
import UsersModal from './Modal/UsersModal'
import ModalContainer from './Modal/ModalContainer'

const UsersContainer = ({user, socket, currentUser}) => {
    const {_id, username,roomId, job, password, role} = user
    const {isShown, toggle} = ModalContainer()

    const [userName, setUserName] = useState(username)
    const [newJob, setNewJob] = useState(job)
    const [newRole, setNewRole] = useState(role)
    const [disabled, setDisabled] = useState(true)


    const removeUser = async () => {
        const data = {
            id: _id,
            currentUser: currentUser
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
                currentUser: currentUser
            }

        toggle()
        socket.emit('updateUser', newUser)
    }

    return (
        <section className="second-home-container">
            <div className="second-container-center">
                <button id="user-button" onClick={toggle}>Edit</button>
                <button id="user-button" onClick={removeUser}>Delete</button>
                <h3>ID: {_id} </h3>
                <h3>Name: {username} </h3>
                <h3>Specialty: {job}</h3>
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
