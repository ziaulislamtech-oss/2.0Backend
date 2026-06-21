import axios from "axios";


const API_URL = 'https://sectrynoteapp.onrender.com/'

export const fetchedNotes =async ()=>{
  const response = await axios.get(`${API_URL}/notes`);
 
  return response.data.allNotes
}

export const createNote = async(title,description)=>{

  try{
    const response = await axios.post(`${API_URL}/note`,{title,description})
    
    return response.message
  }catch(error){
    console.log('error while  creating note',error)
    throw error
  }


}

export const deleteNote =  async(id)=>{
  const response = await axios.delete(`${API_URL}/notes/${id}`)
  return response.message
}

export const updateNote = async(id,title,description)=>{
     const response = await axios.put(`${API_URL}/notes/${id}`,{title,description})
     return response.message
}