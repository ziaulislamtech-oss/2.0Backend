import axios from "axios"

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials : true
})

export async function getSong(mood){

    const response = await api.get(`/api/song?mood=${mood}`)
    return response.data


}

export async function uploadSong(data){

    const formData = new FormData()
    
    formData.append("title", data.title);
    formData.append("artist", data.artist);
    formData.append("mood", data.mood);
    formData.append("language", data.language);
    formData.append("description", data.description);

    formData.append("audioFile", data.audioFile[0]);
    formData.append("coverImage", data.coverImage[0]);

    const response = await api.post("/api/song/upload",formData)

    return response.data
}


export async function getAllSongs(){

    const resposne = await api.get('/api/song/allsongs')

    return resposne.data
}