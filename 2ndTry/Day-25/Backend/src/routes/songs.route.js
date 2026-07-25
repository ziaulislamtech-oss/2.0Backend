const express = require('express')
const upload = require('../middlewares/upload.middleware')
const songsController = require('../controllers/songs.controller')

const router = express.Router()


router.post('/upload', upload.fields([
    {
        name: 'audioFile',
        maxCount: 1,
    },
    {
        name: 'coverImage',
        maxCount: 1
    }
]), songsController.songUploadController)
router.get('/', songsController.getSongController)
router.get('/allsongs',songsController.getAllSongsController)


module.exports = router