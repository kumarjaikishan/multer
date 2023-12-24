const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        return cb(null, __dirname+"../tmp");
        // return cb(null, "/tmp");
    },
    filename: function async (req, file, cb) {
        const uniquename = `${Date.now()}-${file.originalname}`;
        cb(null, uniquename);
        return;
    },
})

const upload = multer({ storage });

module.exports = upload;

