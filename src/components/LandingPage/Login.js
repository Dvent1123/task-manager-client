import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/Login.css'
import { loginUser} from '../../services/loginServices'
import useToken from '../../utils/useToken'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Login = () => {
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const { token, setToken } = useToken()

        //this code works and it also logs the specific error
    const loginNewUser = async (newUser) => {
        try{
            const res = await loginUser(newUser).then(newToken => 
                {
                    return newToken
                })
            setToken(res)

        }catch(error){
            console.log(error)
            const errorData = error.response.data
            const errorMessage = errorData.errors[0].message
            toast.error(errorMessage)
        }
    }

    useEffect(() => {
        if(token){
             window.location.href = './home'
        }
    }, [token])

    const onSubmit = (e) => {
        e.preventDefault()
        const loginUser = {
            username: username,
            password: password,
        }

        loginNewUser(loginUser)

        setPassword('')
        setUserName('')
    }

    return (
        <div className='login'>
            <ToastContainer />
            <div className="login-wrapper">
                <form onSubmit={onSubmit}> 
                {/* <div className="imgcontainer"> 
                    <img alt="Avatar" className="avatar" />
                    </div> */}
                <div className="container">
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUserName(e.target.value)} name="username" required/>

                    <label htmlFor="passorw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required/>

                    <button type="submit">Login</button>
                </div>

                <div className="container" style={{backgroundColor:'#bbb'}}>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                    <Link to="/">
                        Back to home
                    </Link>
                    {/*<button type="button" className="cancelbtn">Cancel</button>*/}
                </div>
                </form>
            </div>
        </div>
    )
}

export default Login
