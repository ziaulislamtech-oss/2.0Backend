const express = require('express')

const app= express()

app.use(express.json())
const notes = []

app.get("/",(req,res)=>{
    res.send('hello world')
})

//  post method
app.post('/notes',(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    console.log(notes)
    res.send("notes are created")
})

/* Get / notes*/
app.get("/notes",(req,res)=>{
    res.send(notes)
})
 
/* delete /notes */


/* Delete /notes/0 */
app.delete("/notes/:index",(req,res)=>{
    console.log(req.params.index)
    delete notes[req.params.index]
    res.send("note Deleted")
})

/* PATCH  /notes/:index */
/* req.body = {description :- "sample modified description."} */

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send('notes updated successfully ')
}) 

module.exports = app

