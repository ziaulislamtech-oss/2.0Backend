import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials : true
})

export async function login(data){

    const resposne = await api.post('/api/auth/login',data)
    return resposne.data
}

export async function register(username,email,password){

    console.log(`username : ${username}, email : ${email}, password : ${password}`)
    console.log("register api is hitting...")
    const response = await api.post('/api/auth/register',{username,email,password})
    console.log("Register Response : ",response)
    return response.data
}