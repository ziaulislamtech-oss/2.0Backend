import axios, { create } from "axios";
import useNotes from "../hooks/useNotes";


const NotesPage = () => {

    const {
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
    } = useNotes()
    

    return (
        <div className="w-screen h-screen bg-amber-100 flex flex-wrap ">
            <div className="basis-full flex gap-3 items-start">
                <input className="border-2" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter note title" />
                <input className="border-2" value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter note description" />
                <button className="w-max h-max px-3  py-1 rounded bg-amber-500" onClick={()=>{createANote(),setIsUpdate(false)}} >{isUpdate?"update note" : "create note"}</button>
            </div>
            {
                notes.map((note) => {
                    return <div key={note._id} className=" w-50 h-50 ml-5 bg-amber-400 flex justify-center flex-col items-center gap-3">
                        <h3>{note.title}</h3>
                        <p>{note.description}</p>
                        <div className="flex  gap-2" >
                            <button onClick={()=>deleteANote(note._id)}  className="w-max h-max px-3 py-1 rounded bg-amber-700">Delete</button>
                            <button onClick={()=>{startEditing(note)}}  className="w-max h-max px-3 py-1 rounded bg-amber-700">update</button>

                        </div>
                    </div>
                })
            }

        </div>
    )
}

export default NotesPage
