const express = require('express')

const app = express()
app.use(express.json())

let notes = []

app.get('/',(req,res)=>{
    res.send('hellow world')
})

app.get('/notes',(req,res)=>{
   
    res.send(notes)

})

app.post('/note',(req,res)=>{

    notes.push(req.body)
    
    res.send('notes created successfully')

})

app.delete('/notes/:index',(req,res)=>{
    let id = req.params.index

    notes.splice(id,1)

    res.send('note deleted successfully')
})

app.patch('/notes/:index',(req,res)=>{
    let id = req.params.index
    let newNote = req.body
    notes[id] = {...notes[id],...newNote}
    res.send("note updated successfully")
})


module.exports = app