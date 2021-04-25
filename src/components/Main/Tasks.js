import React, {useState, useEffect, useRef, useContext} from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import TasksContainer from '../Helpers/TasksContainer'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import TasksModal from '../Helpers/Modal/TasksModal'
import {getAllTasks} from '../../services/tasksService'
import Loading from '../Helpers/Loading'
import Nav from '../Main/Nav'
import useToken from '../../utils/useToken'
import jwt_decode from 'jwt-decode'
import { getAllUsers } from '../../services/usersServices'
import {SocketContext} from '../../services/socketService'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Tasks = () => {
    const [tasks, setTasks] = useState(null)
    const {isShown, toggle} = ModalContainer()
    const [createdBy, setCreatedBy] = useState('')
    const [assignedTo, setAssignedTo] = useState('None')
    const [status, setStatus] = useState('')
    const [desc, setDesc] = useState('')
    const [users, setUsers] = useState(null)

    const [loading, setLoading] = useState(true)
    const { token} = useToken()
    const [decoded, setDecoded] = useState('')
    let realToken = useRef()
    const socket = useContext(SocketContext)


    useEffect(() => {
        let timer = setTimeout(() => setLoading(false), 6000)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        const parseToken = JSON.parse(token)
        realToken.current = parseToken.token
        setDecoded(jwt_decode(realToken.current))
        socket.emit('subscribe', jwt_decode(realToken.current).roomId,jwt_decode(realToken.current).username)
        setCreatedBy(decoded.username)

        return(() => {
            socket.emit('unsubscribe', jwt_decode(realToken.current).roomId, jwt_decode(realToken.current).username)
            socket.removeAllListeners()
        })        
    }, [socket,token, decoded.username])

//sockets use effect
    useEffect(()=> {
        socket.on('joined', message =>{ 
            console.log(message)
        })

        socket.on('left', message => console.log(message))

        socket.on('TaskAdded', (result) => {
            const {data, success, message} = result
            if(!success){
                toast.error(message)
            }else{
                setTasks(prevTasks => [...prevTasks, data])
                toast.success(message)
            }
        })

        socket.on('TaskDeleted', (result) => {
            const {data, success} = result
            if(!success){
                toast.error('An error occurred :(')
            }else{
                if(tasks){
                    setTasks(prevTasks => prevTasks.filter(item => item._id !== data._id))
                }
                toast.success('Task deleted!')
            }
        })

        socket.on('TaskUpdated', (result) => {
            const {data, success, message} = result
            if(!success){
                toast.error(message)
            }else{
                const taskIndex = tasks.findIndex(item => item._id === data._id)
                const updatedTasksArray = [...tasks]
                updatedTasksArray[taskIndex] = data
                setTasks(updatedTasksArray)
                toast.success(message)
            }
        })

        return(() => {
            socket.removeAllListeners()
        })
    },[socket, tasks])


    const onSubmit = (e) => {
        e.preventDefault()
        const newTask = {
                createdBy: createdBy,
                assignedTo: assignedTo,
                roomId: decoded.roomId,
                status: status,
                desc: desc
            }

            socket.emit('addTask', newTask)
            toggle()
            setAssignedTo('None')
            setDesc('')
    }

    useEffect(() => {
        const getTasks = () => {
            getAllTasks(realToken.current).then(res => {
                var newArrayTaskofObject = Object.values(res.tasksArray)
                setTasks(newArrayTaskofObject)
            })
            .catch(err => console.log(err))
        }
        getTasks()
    }, [])

    useEffect(()=> {
        const getUsers = () => {
            getAllUsers(realToken.current).then(res => {
                var newArrayUserofObject = Object.values(res.usersArray)
                let userNames = newArrayUserofObject.map(user => {
                    return user.username
                })
                //sets the users as an array of only user names
                setUsers(userNames)
            })
            .catch(err => console.log(err))
        }
        getUsers()
    }, [])

    //renders the task
    const renderTasks = (filteredTask) => {
        return (
            <div key={filteredTask._id}>
                <TasksContainer users={users} task={filteredTask} tasks={tasks} setTasks={setTasks} socket={socket}/>
            </div>
        )
    }

    return (
            <section className="home-containers">
                <ToastContainer />
                <Nav />
                <div className="section-title">
                    <h1>Tasks</h1>
                    <button className="button-default" onClick={toggle}><AiFillPlusCircle size={'40px'}/></button>
                </div>
                <TasksModal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                assignedTo={assignedTo} setAssignedTo={setAssignedTo}
                desc={desc} setDesc={setDesc}
                status={status} setStatus={setStatus}
                users={users} createdBy={createdBy} />
                <section className="section-container">
                    <div className="section-title">
                        <h2>Not Complete</h2>
                    </div>
                            { loading === false ?
                                (<div className="tasks">
                                    {(tasks && tasks.length > 0) ? (
                                        tasks.filter(task => task.status === 1).map(filteredTask => {
                                         return renderTasks(filteredTask)
                                        })
                                    ) : (
                                        //come back and change this to something else
                                        <p>No tasks found</p>
                                    )}
                                </div>) : (
                                    <Loading />
                                )
                            }
                    </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>In Progress</h2>
                    </div>
                            { loading === false ?
                                (<div className="tasks">
                                    {(tasks && tasks.length > 0) ? (
                                        tasks.filter(task => task.status === 2).map(filteredTask => {
                                         return renderTasks(filteredTask)
                                        })
                                    ) : (
                                        //come back and change this to something else
                                        <p>No tasks found</p>
                                    )}
                                </div>) : (
                                    <Loading />
                                )
                            }
                </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>Pending Approval</h2>
                    </div>
                            { loading === false ?
                                (<div className="tasks">
                                    {(tasks && tasks.length > 0) ? (
                                        tasks.filter(task => task.status === 3).map(filteredTask => {
                                         return renderTasks(filteredTask)
                                        })
                                    ) : (
                                        //come back and change this to something else
                                        <p>No tasks found</p>
                                    )}
                                </div>) : (
                                    <Loading />
                                )
                            }
                </section>
            </section>
    )
}

export default Tasks
