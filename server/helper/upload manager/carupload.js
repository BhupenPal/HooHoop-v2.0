const multer = require("multer")
const fs = require("fs")

let ExteriorSliderCount = 0
const MaxSize = 15 * 1024 * 1024; //1024 * 1024 = 1MB

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'ExteriorSlider') {
        if (file.mimetype !== 'image/png') {
            return cb(null, false, new Error('I don\'t have a clue!'));
        }
        cb(null, true);
    }

    else if (file.fieldname === 'ExteriorVideo') {
        cb(null, `assets/Uploads/${VINum}/Exterior`)
    }

    else {
        cb(null, `assets/Uploads/${VINum}/Interior`)
    }
}

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        const { VINum } = req.body;

        //Creates folder for exterior, interior, and thumbnail
        if (!fs.existsSync(`assets/uploads/cars/${VINum}/`)) {
            fs.mkdirSync(`assets/uploads/cars/${VINum}/`)
            fs.mkdirSync(`assets/uploads/cars/${VINum}/ExteriorSlider`)
            fs.mkdirSync(`assets/uploads/cars/${VINum}/Exterior `)
            fs.mkdirSync(`assets/uploads/cars/${VINum}/Interior`)
            fs.mkdirSync(`assets/uploads/cars/${VINum}/Thumbnail`)
        }

        if (file.fieldname === 'ExteriorSlider') {
            cb(null, `assets/Uploads/${VINum}/ExteriorSlider`)
        }

        else if (file.fieldname === 'ExteriorVideo') {
            cb(null, `assets/Uploads/${VINum}/Exterior`)
        }

        else {
            cb(null, `assets/Uploads/${VINum}/Interior`)
        }
    },

    filename: (req, file, cb) => {
        let ext = file.originalname.split(".").pop()
        let filename = ''

        if (file.fieldname === 'ExteriorSlider') {
            ExteriorSliderCount++
            filename = ExteriorSliderCount + "." + ext
            cb(null, filename)
        }

        else if (file.fieldname === 'ExteriorVideo') {
            filename = "video" + "." + ext
            cb(null, filename)
        }

        else {
            filename = file.fieldname + "." + ext;
            cb(null, filename.toLowerCase())
        }
    }

})

module.exports = multer({
    limits: { fileSize: MaxSize },
    fileFilter,
    storage
})
    .fields([
        { name: "ExteriorSlider", maxCount: 14 },
        { name: "ExteriorVideo", maxCount: 1 },
        { name: "InteriorFront", maxCount: 1 },
        { name: "InteriorMiddle", maxCount: 1 },
        { name: "InteriorRear", maxCount: 1 },
    ])