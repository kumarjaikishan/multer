const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const multer = require('multer');
const upload = require('./middleware/multer_middleware')
const path = require('path');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'dist')))
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

app.post('/photo', upload.single('image'), (req, res) => {
    // The uploaded file is available in req.file.buffer
    // You can process it as needed

    // if (!req.file) {
    //     return res.status(400).send('No file uploaded.');
    // }

    console.log(req.body);  // Contains fields other than files
    console.log(req.file);  // Contains the uploaded file details

    // Process the uploaded file or send a response
    res.status(200).send('File uploaded successfully.');
});

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
