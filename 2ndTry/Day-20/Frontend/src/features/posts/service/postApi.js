import axios from "axios"

const api = axios.create({
    baseURL : 'http://localhost:3000',
    withCredentials : true
})



export const getFeed = async()=>{

    const response = await api.get('/api/post/getfeed')
    return response.data

}

export const likePost = async(postid)=>{

    const response = await api.post(`/api/post/like/${postid}`)

    return response.data
}

export const unLikePost = async (postid)=>{
    
    const response = await api.post(`/api/post/unlike/${postid}`)

    return response.data
}


export async function createPost(imageFile,caption){

    const formData = new FormData()
    formData.append('file',imageFile)
    formData.append('caption',caption)

    const response = await api.post('/api/post/create',formData)

    return response.data

}

export async function savePost(postid){

    const response = await api.post(`/api/post/savepost/${postid}`)
    return response.data

}

export async function deleteSavedPost(postid){

    const response = await api.post(`/api/post/deletepost/${postid}`)

    return response.data
}

export async function getSavedPosts(){

    const response = await api.get('/api/post/getsavedposts')

    return response.data
}