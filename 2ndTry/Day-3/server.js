const express = require('express')
const app = express()
const port = 3000;
app.use(express.json())
let notes = [
    {
        title : "test title 1",
        description : "test description 1 "
    },
    {
        title : " test title 2",
        description : "test title 2"
    }
]

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.post('/note',(req,res)=>{
    res.send('noted created successfully')
    notes.push(req.body)
    console.log(req.body)
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.listen(port,()=>{
    console.log(`server is running on ${port} port`)
})