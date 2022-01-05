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
    const parseToken = JSON.parse(token)
    realToken.current = parseToken.token

    useEffect(() => {
        let timer = setTimeout(() => setLoading(false), 6000)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
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

        socket.on("joined", () =>
        socket.emit("subscribe", decoded.roomId, decoded.username)
      );

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
        if(filteredTask){
            return (
                <div key={filteredTask._id}>
                    <TasksContainer userName={createdBy} users={users} task={filteredTask} socket={socket}/>
                </div>
            )
    
        }
        return (
            <div>
                <h1>No Tasks Available</h1>
            </div>
        )
    }

    return (
        <div className="wrapper">
                <ToastContainer />
                <Nav token={realToken.current}/>
            <div className="container">
                <section className="whole-section-containers">
                    <div className="section-header">
                        <h1>Tasks</h1>
                        <button className="add-btn" onClick={toggle}><AiFillPlusCircle size={'40px'}/></button>
                    </div>
                    <TasksModal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                        assignedTo={assignedTo} setAssignedTo={setAssignedTo}
                        desc={desc} setDesc={setDesc}
                        status={status} setStatus={setStatus}
                        users={users} createdBy={createdBy} />
                    <section className="section-container">
                        <section className="info-container-title">
                                <div className="info-container-center-title">
                                    <h3 className='normal-containter-title'>Assigned</h3>
                                    <div className="divider-task-title"> | </div>
                                    <h3 className='description-container-title'>Description</h3>
                                    <div className="divider-task-title"> | </div>
                                    <h3 className='normal-containter-title'>Status</h3>
                                    <div className="divider-task-title"> | </div>
                                    <h3 className='normal-containter-title'>Editing</h3>
                                </div>
                            </section>
                                { loading === false ?
                                    (<div className="tasks">
                                        {(tasks && tasks.length > 0) ? (
                                            tasks.filter(task => task.status === 1).map(filteredTask => {
                                                return renderTasks(filteredTask)
                                            })
                                        ) : (
                                            //if there are no tasks, show nothing
                                            <p></p>
                                        )}
                                    </div>
                                    ) : (
                                        <Loading />
                                    )
                                }
                                { loading === false ?
                                    (<div className="tasks">
                                        {(tasks && tasks.length > 0) ? (
                                            tasks.filter(task => task.status === 2).map(filteredTask => {
                                                return renderTasks(filteredTask)                                        
                                            })
                                        ) : (
                                            //if there are no tasks, display no task description
                                            <p className="landing-header">No tasks found</p>
                                        )}
                                    </div>) : (
                                        <div></div>
                                    )
                                }
                                { loading === false ?
                                    (<div className="tasks">
                                        {(tasks && tasks.length > 0) ? (
                                            tasks.filter(task => task.status === 3).map(filteredTask => {
                                            return renderTasks(filteredTask)
                                            })
                                        ) : (
                                            //if there are no tasks, show nothing 
                                            <p></p>
                                        )}
                                    </div>) : (
                                        <div></div>
                                        )
                                }
                    </section>
                </section>
            </div>
        </div>
    )
}

export default Tasks
