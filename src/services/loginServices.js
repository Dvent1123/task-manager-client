import axios from 'axios'

export const registerUser = async (user) => {
    let res = await axios.post(`${process.env.REACT_APP_API}/api/login/signup`, user)
    return res.data || []
}

export const loginUser = async (user) => {
    let res = await axios.post(`${process.env.REACT_APP_API}/api/login/signin`, user)
    return res.data || []
}