const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const multer = require('multer');
const upload = require('./middleware/multer_middleware')

app.use(express.json());
app.use(cors());

// // Setup multer for handling file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // console.log(file);
//         return cb(null, "./uploads");
//     },
//     filename: function async(req, file, cb) {
//         const uniquename = `${Date.now()}-${file.originalname}`;
//         cb(null, uniquename);
//         return;
//     },
// })
// const upload = multer({ storage: storage });

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
