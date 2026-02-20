const express = require("express")
const app = express()
app.use(express.json())
const noteModel = require('./models/notes.models')

app.post("/notes",async (req,res)=>{
    const {title,description,age} = req.body
    const note = await noteModel.create({
        title,description,age
    })
    res.status(201).json({
        message : "Note created successfully",
        note
    })
})

// Get Method
app.get("/notes", async (req,res)=>{
    const note = await noteModel.find()
    res.status(200).json({
        message : "Notes fetched successfully",
        note
    })    
})


module.exports = app