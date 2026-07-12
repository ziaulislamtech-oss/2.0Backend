import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials:true
})


export const getFollowedUser = async()=>{

    const response = await api.get('api/user/followedusers')
    return response.data
}
// http://localhost:3000/api/user/followedusers
