import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',
    withCredentials: true
})

export async function login(email, password) {

    console.log("loggin api is calling..")

    const resposne = await api.post('/api/auth/login', { email, password })
    console.log('response : ', resposne)
    return resposne.data
}

export async function register(username, email, password) {

    console.log(`username : ${username}, email : ${email}, password : ${password}`)
    console.log("register api is hitting...")
    const response = await api.post('/api/auth/register', { username, email, password })
    console.log("Register Response : ", response)
    return response.data
}

// Add this export to your existing Features/Auth/service/auth.api.js
// (using whatever axios instance you already have set up there, same as chat.api.js)

export const getMe = async () => {
    const response = await api.get('/api/auth/getme')
    return response.data
}