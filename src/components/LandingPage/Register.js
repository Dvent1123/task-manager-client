import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { registerUser} from '../../services/loginServices'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Register = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const history = useHistory()


    //this code works and it also logs the specific error
    const registerNewUser = async (newUser) => {
        try{
            let res = await registerUser(newUser)
            if(res){
                history.push('/login')
            }
        }catch(error){
            const errorData = error.response.data
            const errorMessage= errorData.errors
            toast.error(errorMessage[0].message)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newUserObj = {
            username: userName,
            password: password,
            password_confirmation: password2
        }

        registerNewUser(newUserObj)

        setUserName('')
        setPassword('')
        setPassword2('')
    }

    return (
            <div className="container">
            <ToastContainer />
            <div class="form-spacer"></div>
                <div className="form-wrapper">
                    <form className='modal-form' onSubmit={onSubmit}>
                        <div className="form-group">
                            <h1>Register</h1>
                            <br></br>
                            <p>Please fill in this form to create an account.</p>

                        </div>
                        <div className="form-group">
                            <label className='label-styling' htmlFor="username"><b>Username</b></label>
                            <input className='option-styling' type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Username" name="username" id="username"/>
                        </div>
                        <div className="form-group">
                            <label className='label-styling' htmlFor="psw"><b>Password</b></label>
                            <input className='option-styling' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" name="psw" id="psw" required />        
                        </div>
                        <div className="form-group">
                            <label className='label-styling' htmlFor="psw-repeat"><b>Repeat Password</b></label>
                            <input className='option-styling' type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required />                            
                        </div>
                        <div className="form-group">
                            <button type="submit" className="task-button">Register</button>
                        </div>
                        <div className="form-group" style={{backgroundColor:'#bbb'}}>
                                <p>Already have an account? <Link to="/login">Log in</Link> </p>
                                <Link to="/" className="btn-flat waves-effect">
                                <i>Back to home</i> 
                                </Link>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default Register
