const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

// Set up storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('imageFile'), (req, res) => {
    res.send('Image has been successfully uploaded!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
