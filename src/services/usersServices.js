import axios from 'axios'

export const getAllUsers = async (token) => {
    let res = await axios.get(`${process.env.REACT_APP_API}/users`, {
      headers: { Authorization: `Bearer ${token}`}  
    })
    return res.data || []
}

export const getUser = async (token) => {
  let res = await axios.get(`${process.env.REACT_APP_API}/users/user`, {
    headers: { Authorization: `Bearer ${token}`}  
  })
  return res.data || []}