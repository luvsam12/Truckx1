const express = require("express");
const router = express.Router();
const Alarm = require("./../models/alarm")
const multer = require("multer")

//to store the file in respective folder
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})


// Endpoint to get only the alarms
router.get('', (req,res) => {
    Alarm.find({type: "ALARM"})
    .sort({alarm_time: -1})
    .then((post) => {
        res.status(200)
        .json({success:true, msg: "Alarm found", data: post})
    })
    .catch((err) => {
        res.status(400)
        .json({success: false, msg: "No alarm found"})
    })
})

// Endpoint to get all the types of uploads 
router.get('/alluploads', (req,res) => {
    Alarm.find()
    .sort({alarm_time: -1})
    .then((post) => {
        res.status(200)
        .json({success:true, msg: "All uploads sent", data: post})
    })
    .catch((err) => {
        res.status(400)
        .json({success: false, msg: "No uploads found"})
    })
})


// Endpoint to get a filtered result on the basis of start time and end time
router.post('/filter', (req,res) => {
    Alarm.find()
    .then((result) => {
        let filtered = []
        for(let i=0;i<result.length;i++){
            if((result[i].alarm_time).toString() >= String(req.body.start_time) && (result[i].alarm_time).toString() <= String(req.body.end_time)){
                 filtered.push(result[i])
            }
        }
        res.status(200)
        .json({success: true, msg: "data is sent", data: filtered})
    })
    .catch((err) => {
        res.status(400)
        .json({success: false, msg: "data not sent", data: err})
    })
})



// Endpoint to post an alarm and upload the video corresponding to it.
router.post('', upload.single('file_list') ,(req,res,next) => {
    console.log(req.file)
    const new_alarm = new Alarm({
        type: "ALARM",
        IMEI: req.body.IMEI,
        alarm_type: req.body.alarm_type,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        file_list: req.file.path
    })

    new_alarm.save()
    .then(() => {
        res.status(200)
        .json({status: true, msg: "Alarm saved"})
    })
    .catch((err) => {
        res.status(400)
        .json({success :false, msg: "Alarm not saved", err: err})
    })
})



// endpoint to upload a video wrt a particular Dashcam.
router.post('/upload', upload.single('file_list') ,(req,res,next) => {
    console.log(req.file)
    const new_alarm = new Alarm({
        type: "UPLOAD",
        IMEI: req.body.IMEI,
        file_list: req.file.path
    })

    new_alarm.save()
    .then(() => {
        res.status(200)
        .json({status: true, msg: "Video uploaded"})
    })
    .catch((err) => {
        res.status(400)
        .json({success :false, msg: "video not uploaded", err: err})
    })
})

module.exports = router;