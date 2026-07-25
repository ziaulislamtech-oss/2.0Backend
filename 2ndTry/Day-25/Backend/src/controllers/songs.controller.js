
const id3 = require('node-id3')

const storageService = require('../services/storage.service')
const songModel = require('../models/song.model')


const songUploadController = async (req, res) => {

    try {
        const { title, artist, mood, language, description } = req.body;

        if (!req.files?.audioFile) {
            return res.status(400).json({
                message: "Audio file is required",
            });
        }

        if (!req.files?.coverImage) {
            return res.status(400).json({
                message: "Cover image is required",
            });
        }

        const audio = req.files.audioFile[0];
        const cover = req.files.coverImage[0];

        const songFile = await storageService.uploadFile({
            buffer: audio.buffer,
            filename: `${Date.now()}-${title}.mp3`,
            folder: "songs",
        });

        const uploadCover = await storageService.uploadFile({
            buffer: cover.buffer,
            filename: `${Date.now()}-${title}-cover`,
            folder: "song-covers",
        });

        const song = await songModel.create({
            title,
            artist,
            mood,
            language,
            description,
            url: songFile.url,
            coverImage: uploadCover.url,
        });

        return res.status(201).json({
            message: "Song uploaded successfully",
            song,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message,
            stack: error.stack,
        })
    };

}

const getSongController = async (req, res) => {

    const { mood } = req.query;

    const songs = await songModel.aggregate([
        {
            $match: { mood }
        },
        {
            $sample: { size: 1 }
        }
    ]);

    if (songs.length === 0) {
        return res.status(404).json({
            message: "We have no songs for your current mood."
        });
    }

    return res.status(200).json({
        message: "We have a song for your mood.",
        song: songs[0]
    });
};

const getAllSongsController = async (req, res) => {

    try {
        const songs = await songModel.find().sort({ createdAt: -1 })

        return res.status(200).json({
            message: "Songs fetched successfully",
            count: songs.length,
            songs
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Internal server error",

        })
    }
}


module.exports = {
    songUploadController,
    getSongController,
    getAllSongsController
}