const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const upload = require('./middleware/multer_middleware')
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2

app.use(express.json());
app.use(cors());

cloudinary.config({
    cloud_name: 'dusxlxlvm',
    api_key: '214119961949842',
    api_secret: "kAFLEVAA5twalyNYte001m_zFno"
});

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'dist')))
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

app.post('/photo', upload.single('image'), async (req, res) => {

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        await cloudinary.uploader.upload(req.file.path, (error, result) => {
            console.log(error, result);
            if (error) {
                return res.status(500).send(error);
            }

            fs.unlink(req.file.path, (err => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("error occured while deleting file");
                }   else {
                    console.log("file deleted");
                    return res.status(201).send("File Uploaded");
                    // Get the files in current directory 
                    // after deletion 
                    //   getFilesInDirectory(); 
                }
            }));
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }


    // console.log(req.body);  // Contains fields other than files
    // console.log(req.file);  // Contains the uploaded file details

    // Process the uploaded file or send a response
    // res.status(200).send('File uploaded successfully.');
});

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
