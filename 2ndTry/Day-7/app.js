const express = require('express')
const noteModel = require('./models/notes.model')
const app = express()
app.use(express.json())

app.post('/note', async (req,res)=>{
    const note = await noteModel.create({
        title    : req.body.title,
        description : req.body.description
    })

    res.status(201).json({
        message : 'note created successfully',
        note
    })
})

app.get('/notes',async(req,res)=>{

    const allnotes = await noteModel.find()

    res.status(200).json({
        message : "notes fetched successfully",
        allnotes
    })
})


module.exports = app