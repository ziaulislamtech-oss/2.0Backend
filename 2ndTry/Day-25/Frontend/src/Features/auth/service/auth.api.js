import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:3000',
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