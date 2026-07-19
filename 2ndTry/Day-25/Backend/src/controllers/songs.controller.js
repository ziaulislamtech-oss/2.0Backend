
const id3 = require('node-id3')

const storageService = require('../services/storage.service')
const songModel = require('../models/song.model')


const songUploadController = async(req,res)=>{

    console.log(req.file)
    const {mood} = req.body

    const songBuffer = req.file.buffer
    const tags = id3.read(songBuffer)

    console.log(tags)

    const songFile = await storageService.uploadFile({
        buffer : req.file.buffer,
        filename : tags.title+"mp3",
        folder : 'songs'
    })
    console.log('song file : ',songFile)

    const song = await songModel.create({
        title : tags.title,
        url : songFile.url,
        mood : mood

    })

    res.status(201).json({
        message : "song uploaded successfully",
        song
    })


}

const getSongController = async(req,res)=>{

    const mood = req.query

    const song = await songModel.findOne(mood)

    if(!song){
        return res.status(404).json({
            message : "we have no songs for your current mood"
        })
    }

    return res.status(200).json({
        message : "we have a song for your mood",
        song
    })
}


module.exports = {
    songUploadController,
    getSongController
}