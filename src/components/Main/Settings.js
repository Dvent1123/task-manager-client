import React, {useEffect, useState, useRef, useContext } from 'react'
import Nav from '../Main/Nav'
import useToken from '../../utils/useToken'
import jwt_decode from 'jwt-decode'
import Loading from '../Helpers/Loading'
import { getUser } from '../../services/usersServices'
import {SocketContext} from '../../services/socketService'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Settings = () => {
    const [currentUser, setCurrentUser] = useState('')
    const [loading, setLoading] = useState(true)
    const { token } = useToken()
    const [decoded, setDecoded] = useState('')

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')
    const [job, setJob] = useState('')
    const [role, setRole] = useState('User')

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
        const getUserInfo = () => {
            getUser(realToken.current).then(res => {
                let completeUser = res.currentUser
                setUserName(completeUser.username)
                setJob(completeUser.job)
                setRole(completeUser.role)
            })
            .catch(err => console.log(err))
        }
        getUserInfo()
    }, [])


    useEffect(()=> {

        setDecoded(jwt_decode(realToken.current))
        socket.emit('subscribe', jwt_decode(realToken.current).roomId, jwt_decode(realToken.current).username)
        setCurrentUser({username: decoded.username,id: decoded.userId})

        return(() => {
            socket.emit('unsubscribe', jwt_decode(realToken.current).roomId, jwt_decode(realToken.current).username)
            socket.removeAllListeners()
        })        
    }, [token, socket, decoded.username, decoded.userId])

    useEffect(() => {
        socket.on('joined', message =>{ 
            console.log(message)
        })

        socket.on('left', message => console.log(message))

        socket.on('updatedSettings', (result) => {
            const {success, message} = result
            if(!success){
                toast.error(message)
            }else{
                toast.success(message) 
                setPassword('')
                setNewPassword('')
                setNewPasswordConfirmation('')
            }
        })

        return(() => {
        socket.removeAllListeners()
        })        
    },[socket, userName])

    const onSubmit = (e) => {
        console.log(currentUser.id)
        e.preventDefault()
        const newUser = {
            id: currentUser.id,
            currentUser: currentUser.username,
            username: userName,
            roomId: decoded.roomId,
            current_password: password,
            new_password: newPassword,
            new_password_confirmation: newPasswordConfirmation,
            role: role,
            job: job,
        }

        socket.emit('updateUserSettings', newUser)
    }

    return (
        <div className="wrapper">
            <Nav token={realToken.current}/>
            <ToastContainer />
            <div className="container">
                { loading === false ? (
                        <div className="form-wrapper">
                            <form className='modal-form' onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input className='option-styling' id="username" value={userName} onChange={(e)=> setUserName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">New Password</label>
                                <input className='option-styling' id="password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">New Password Confirmation</label>
                                <input className='option-styling' id="password" value={newPasswordConfirmation} onChange={(e)=> setNewPasswordConfirmation(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="job">Job</label>
                                <input className='option-styling' id="job" value={job} onChange={(e)=> setJob(e.target.value)}/>
                            </div>
                            {/* This can stay for now but gonna have to get values from database */}
                            <div className="form-group">
                                <label htmlFor="role">Security Role: </label>
                                <select className='option-styling' id="role" value={role} onChange={(e)=> setRole(e.target.value)} disabled>
                                    <option className='option-styling' value="user">User</option>
                                    <option className='option-styling' value="admin">Admin</option>
                                </select>    
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Confirm Changes by Typing in Password</label>
                                <input className='option-styling' id="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <button className="submit-button" type="submit">
                                Submit
                                </button>
                            </div>
                        </form>
                        </div>
                ) : (
                    <Loading />
                )

                }

            </div>
        </div>
    )
}

export default Settings