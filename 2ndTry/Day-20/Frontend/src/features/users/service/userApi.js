import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials:true
})


export const getFollowedUser = async()=>{

    const response = await api.get('api/user/followedusers')
    return response.data
}

export const getSuggestedUsers = async()=>{

    const response = await api.get('/api/user/suggestedusers')
    console.log('api',response)

    return response.data

}


export const getProfile = async()=>{

    const response = await api.get('/api/user/profile')

    return response.data
}

export const getProfilePosts = async()=>{
    const response = await api.get('/api/post/profile/posts')
    return response.data
}