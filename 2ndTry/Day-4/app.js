const express = require('express')
const app = express()
app.use(express.json())

let notes =[]

app.get('/',(req,res)=>{
    res.send('welcome to our server')
})

app.post('/note',(req,res)=>{
    notes.push(req.body)
    res.send('NOTE CREATED SUCCESSFULLY')
    console.log(notes)
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.delete('/notes/:index',(req,res)=>{
    let id = req.params.index
   
     notes.splice(id,1)
    
    res.send('note deleted',notes[id])
   
})

app.patch('/notes/:index',(req,res)=>{
    let id = req.params.index

    notes[id] = {
        ...notes[id],
        ...req.body
    }
    res.send('note updated successfully')
})



module.exports = app

