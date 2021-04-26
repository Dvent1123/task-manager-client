import axios from 'axios'

export const getAllTasks = async (token) => {
    let res = await axios.get(`${process.env.REACT_APP_API}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}`}
    })
    return res.data || []
}
