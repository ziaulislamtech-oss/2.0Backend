const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(express.static('./public'))
app.use(cors())

const noteModel = require('./model/note.model')



app.post('/note',async (req,res)=>{

    const {title,description} = req.body

    const note = await noteModel.create({
        title : title ,
        description : description

    })

    res.status(201).json({
        message : 'note created successfully',
        note
    })
})

app.get('/notes',async (req,res)=>{
    const allNotes = await noteModel.find()

    res.status(200).json({
        message  : 'notes fetched successfully',
        allNotes
    })
})

app.put('/notes/:index',async (req,res)=>{
    const id = req.params.index
    const {title,description} = req.body

    const note =  await noteModel.findByIdAndUpdate(id,{title,description})

    res.status(201).json({
        message : 'note updated successfully',
        note
    })
})


app.delete('/notes/:index',async (req,res)=>{
    const id  = req.params.index

    const deleteNote = await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message : 'note deleted successfully',
        deleteNote
    })
})




module.exports = app
