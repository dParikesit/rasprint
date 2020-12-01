const path = require('path')
const express = require('express')
const multer = require('multer')
const {spawn} = require('child_process')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      DEST_DIR = path.join(__dirname, 'files')
      cb(null, DEST_DIR)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html')
app.use(express.static(DIST_DIR))
app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})
app.post('/upload', upload.array('docs', 5), function(req, res, next){
    try {
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
})
const PORT = process.env.PORT || 8080
const HOST = '0.0.0.0'
app.listen(PORT, HOST);
console.log(`App listening to ${PORT}....`)
console.log('Press Ctrl+C to quit.')