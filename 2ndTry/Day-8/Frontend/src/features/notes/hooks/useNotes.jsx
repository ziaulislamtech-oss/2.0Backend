import React, { useEffect, useState } from 'react'
import { createNote, fetchedNotes,updateNote,deleteNote } from '../service/NotesApi'

export const useNotes = () => {
    const [title,setTitle] = useState('')
    const [notes,setNotes] = useState([])
    const [description,setDescription] = useState('')
    const [isUpdate,setIsUpdate] = useState(false)
    const [editingId,setEditingId] = useState(null)


    const loadNotes = async ()=>{
        const data = await fetchedNotes()
        setNotes(data)
        
    }

    useEffect(()=>{
      loadNotes()
    },[])


    const createANote = async () => {
    if (isUpdate) {
      await updateNote(editingId, title, description);
    } else {
      await createNote(title, description);
    }

    setTitle("");
    setDescription("");
    setIsUpdate(false);
    setEditingId(null);

    loadNotes();
  };

   const deleteANote = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  const startEditing = (note) => {
    setIsUpdate(true);
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note._id);
  };

  return {
    notes,
    title,
    description,
    isUpdate,
    setIsUpdate,
    setTitle,
    setDescription,
    createANote,
    deleteANote,
    startEditing,
    }
  
}

export default useNotes
