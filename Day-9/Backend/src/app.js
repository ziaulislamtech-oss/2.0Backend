const express = require('express')
const app = express()
const noteModel = require('./model/note.model')
app.use(express.json())


app.post("/notes",async (req,res)=>{
    const {title,description} = req.body
   const note =  await noteModel.create({
        title,description
    })
    res.status(201).json({
        message : 'Note Created',
        note
    })
})

// Get Method
app.get("/notes",async (req,res)=>{
   const note = await noteModel.find()
   res.status(200).json({
    message : "fetched successfully",
    note
   })
})

// Delete Method
app.delete("/notes/:id",async (req,res)=>{
    const id = req.params.id
    
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message : "Note Deleted"
    })
})

module.exports = app