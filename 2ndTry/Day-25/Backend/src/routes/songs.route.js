const express = require('express')
const upload = require('../middlewares/upload.middleware')
const songsController = require('../controllers/songs.controller')

const router  = express.Router()


router.post('/upload',upload.single('song'),songsController.songUploadController)
router.get('/',songsController.getSongController)


module.exports = router