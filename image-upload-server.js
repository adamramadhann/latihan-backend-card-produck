const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express();

// menentukan folder untuk menyimpan file gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

// endpoint untuk 
app.post('/upload', upload.single('image'), (req, res) => {
    if(!req.file){
        return res.status(400).send('no file uploaded.')
    }
    res.json({imageUrl:`/upload/${req.file.filename}`})
})

// buat folder upload untuk menyimpan file
app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.listen(4000, ()=>{
    console.log('server started on http://localhost:4000')
})
