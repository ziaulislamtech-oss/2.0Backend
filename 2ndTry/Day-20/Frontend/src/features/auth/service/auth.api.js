import axios from 'axios'

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials : true
})

export const login = async(data)=>{

    const response = await api.post('/api/auth/login',data)

    console.log(`response from api ${response}`)

    return response.data
}


export const register = async (data)=>{

    const response = await api.post('/api/auth/register',data)

    return response.data
}

export const getMe = async (data)=>{
    const response = await api.get('/api/auth/getme')

    return response.data
}