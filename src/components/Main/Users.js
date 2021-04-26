import React, {useState, useEffect, useRef, useContext}  from 'react'
import UsersContainer from '../Helpers/UsersContainer'
import {AiFillPlusCircle} from 'react-icons/ai'
import UsersModal from '../Helpers/Modal/UsersModal'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import { getAllUsers } from '../../services/usersServices'
import Loading from '../Helpers/Loading'
import Nav from '../Main/Nav'
import useToken from '../../utils/useToken'
import jwt_decode from 'jwt-decode'
import {SocketContext} from '../../services/socketService'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Users = () => {
    const {isShown, toggle} = ModalContainer()
    const [users, setUsers] = useState(null)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [job, setJob] = useState('')
    const [role, setRole] = useState('User')
    const [currentUser, setCurrentUser] = useState('')


    const [loading, setLoading] = useState(true)
    const { token } = useToken()
    const [decoded, setDecoded] = useState('')

    let realToken = useRef()
    const parseToken = JSON.parse(token)
    realToken.current = parseToken.token
    const socket = useContext(SocketContext)

    useEffect(() => {
        let timer = setTimeout(() => setLoading(false), 6000)
        return () => {
            clearTimeout(timer)
        }
    }, [])


    useEffect(()=> {

        setDecoded(jwt_decode(realToken.current))
        socket.emit('subscribe', jwt_decode(realToken.current).roomId, jwt_decode(realToken.current).username)
        setCurrentUser(decoded.username)

        return(() => {
            socket.emit('unsubscribe', jwt_decode(realToken.current).roomId, jwt_decode(realToken.current).username)
            socket.removeAllListeners()
        })        
    }, [token, socket, decoded.username])

//sockets use effect
    useEffect(() => {
        socket.on('joined', message =>{ 
            console.log(message)
        })

        socket.on('left', message => console.log(message))

        socket.on('UserAdded', (result) => {
            const {data, success, message} = result
            if(!success){
                toast.error(message)
            }else{
                setUsers(prevUsers => [...prevUsers, data])
                toast.success(message)
            }   
        })

        socket.on('UserUpdated', (result) => {
            const {data, success, message} = result
            if(!success){
                toast.error(message)
            }else{
                const userIndex = users.findIndex(item => item._id === data._id)
                const updatedUsersArray = [...users]
                updatedUsersArray[userIndex] = data
                setUsers(updatedUsersArray)
                toast.success(message)  
            }
        })

        socket.on('UserDeleted', (result) => {
            const {data, success} = result
            if(!success){
                toast.error('Something went wrong :(')
            }else{
                if(users){
                    setUsers(prevUsers => prevUsers.filter(item => item._id !== data._id))
                    toast.success('User deleted!')   
                }


            }
        })

        return(() => {
        socket.removeAllListeners()
        })        
    },[socket, users])

    const onSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            username: userName,
            roomId: decoded.roomId,
            password: password,
            password_confirmation: password_confirmation,
            role: role,
            job: job,
            currentUser: currentUser
        }

        socket.emit('addUser', newUser)

        toggle()

        setUserName('')
        setPassword('')
        setPasswordConfirmation('')
        setJob('')
        setRole('User')
    }


    useEffect(()=> {
        const getUsers = () => {
            getAllUsers(realToken.current).then(res => {
                var newArrayUserofObject = Object.values(res.usersArray)
                setUsers(newArrayUserofObject)
            })
            .catch(err => console.log(err))
        }
        getUsers()
    }, [])

    //renders the users
    const renderUsers = (user) => {
        return (
            <div key={user._id}>
                <UsersContainer currentUser={currentUser} user={user} socket={socket}/>
                </div>
        )
    }

    return (
            <section className="home-containers">
                <ToastContainer />
                <Nav token={realToken.current}/>
                <div className="section-title">
                    <h1>Users</h1>
                    <button className="button-default" onClick={toggle}><AiFillPlusCircle size={'40px'}/></button>
                </div>
                <UsersModal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                userName={userName} setUserName={setUserName}
                password={password} setPassword={setPassword}
                password_confirmation={password_confirmation} setPasswordConfirmation={setPasswordConfirmation}
                role={role} setRole={setRole}
                job={job} setJob={setJob}/>
                <section className="section-container">
                        { loading === false ?
                            (<div className="users">
                            {
                                (users && users.length > 0) ? (
                                    users.map(user => {
                                        return renderUsers(user)
                                    })
                                ) :(
                                        <p>No Users found</p>
                                )
                            }
                            </div>) : (
                                <Loading />
                            )
                        }
                    </section>
            </section>
    )
}

export default Users
