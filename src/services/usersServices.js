import axios from 'axios'

export const getAllUsers = async (token) => {
    let res = await axios.get(`${process.env.REACT_APP_API}/api/users`, {
      headers: { Authorization: `Bearer ${token}`}  
    })
    return res.data || []
}
