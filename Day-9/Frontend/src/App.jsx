import axios from 'axios'
import React, { useRef } from 'react'
import { useState, useEffect } from 'react'

const App = () => {
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const [editingId, setEditingId] = useState(null)
  function fetchNotes() {
    axios.get('http://localhost:3000/notes')
      .then((res) => {
        setNote(res.data.note)
      })
  }
  useEffect(() => {
    fetchNotes()
  }, [])
  console.log()
  const [note, setNote] = useState([
    {
      title: "test title 1",
      description: "test description 1"
    },
    {
      title: "test title 2",
      description: "test description 2"
    },
    {
      title: "test title 3",
      description: "test description 3"
    },
    {
      title: "test title 4",
      description: "test description 4"
    },
  ])
  function handleSubmit(e) {
    e.preventDefault()
    const { title, description } = e.target.elements

    if (editingId) {
      axios.patch("http://localhost:3000/notes/" + editingId, {
        title: title.value,
        description: description.value
      })
        .then(res => {
          fetchNotes()
          setEditingId(null)
          e.target.reset()
        })
    } else {
      axios.post("http://localhost:3000/notes", {
        title: title.value,
        description: description.value
      })
        .then(res => {
          fetchNotes()
          e.target.reset()
        })
    }
  }

  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/notes/" + noteId)
      .then(res => {
        fetchNotes()
      })
  }
  function handletUpdateNote(noteId) {
    const selectedNote = note.find(n => n._id === noteId)

    if (selectedNote) {
      titleRef.current.value = selectedNote.title
      descriptionRef.current.value = selectedNote.description
      titleRef.current.focus()
      setEditingId(noteId)
    }
  }



  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input ref={titleRef} type="text" name='title' placeholder='Enter Title' />
        <input ref={descriptionRef} type="text" name='description' placeholder='Enter description' />
        <button id='submit'>
          {editingId ? "Update Note" : "Create Note"}
        </button>

      </form>
      <div className="notes">
        {
          note.map((note, idx) => {

            return <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={(e) => { handleDeleteNote(note._id) }}>Delete Note</button>
              <button onClick={(e) => { handletUpdateNote(note._id,) }}>Update Note</button>
            </div>

          })
        }
      </div>
    </>
  )
}

export default App
