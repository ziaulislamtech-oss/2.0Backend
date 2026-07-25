import axios from 'axios'

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials : true
})


export async function loginUser(data){

    const response = await api.post('/api/auth/login',data)

    return response.data

}

export async function registerUser(data){

    const resposne = await api.post('/api/auth/register',data)
    return resposne.data
}

export async function getMe(){
    
    const response = await api.get('/api/auth/getme')
    return response.data
}

export async function logOut() {
    
    const response = await api.post('/api/auth/logout')

    return response.data
}