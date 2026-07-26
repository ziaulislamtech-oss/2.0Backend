import axios from 'axios'

const api = axios.create({
    baseURL : '/api',
    withCredentials : true
})


export async function loginUser(data){

    const response = await api.post('/auth/login',data)

    return response.data

}

export async function registerUser(data){

    const resposne = await api.post('/auth/register',data)
    return resposne.data
}

export async function getMe(){
    
    const response = await api.get('/auth/getme')
    return response.data
}

export async function logOut() {
    
    const response = await api.post('/auth/logout')

    return response.data
}