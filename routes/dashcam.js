const express = require("express");
const router = express.Router();
const Dashcam = require("../models/dashcam");
router.get('', (req,res) => {
    res.send("Hello Naman");
})

// Endpoint to creat a new entry for a new dashcam
router.post('/new', (req,res) =>{
    let newCam = new Dashcam({
        IMEI: req.body.IMEI
    });

    newCam.save()
    .then(data => {
        res.status(200)
        .json({success: true, msg: "New Dashcam saved", data:data})
    })
    .catch((err) => {
        res.status(400)
        .json({success: false, msg:"Can't save new dashcam", err: err})
    })

})


// Endpoint to update the login time of a particular Dashcam
router.post('', (req,res) => {
    Dashcam.findOne({IMEI: req.body.IMEI})
    .then((camera) => {
        let updated = {
            IMEI: req.body.IMEI,
            login: Date.now(),
            location_time: Date.now()
        }
        Dashcam.updateOne({IMEI: req.body.IMEI}, updated)
        .then((result) =>{
            if(result.nModified === 0){
                res.status(400)
                .json({success:false, msg:"Can't update login", res: result})
            }
            else{
            res.status(200)
            .json({success: true, msg: "login updated", res: result})
            }
        })
    })
    .catch((err) => {
        res.status(400)
        .json({success: false, msg:"Can't update login", msg: err})
})
})



// Endpoint to update the location of a particular Dashcam
router.post('/location', (req,res) => {
        let updated = {
            location_time: Date.now(),
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }
        Dashcam.updateOne({IMEI: req.body.IMEI}, updated)
        .then((data) => {
            if(data.nModified === 0){
                res.status(400)
                .json({success: false, msg: "can't update location", err: data})
            }
            else{
                res.status(200)
                .json({success: true, msg: "location updated", data: data})
            }
        })
        .catch(() => {
            res.status(400)
            .json({success: false, msg: "can't update location", err: data})
        })
    })



//Endpoint for the Moderator to send the commmand to a particular dashcam
router.post("/command", (req,res) => {
    let command = {
        command: req.body.command
    }
    Dashcam.updateOne({IMEI: req.body.IMEI}, command)
    .then((res) => {
        // console.log(res)
        if(res.nModified === 0){
            res.status(400)
            .json({success: false, msg: "command not sent"})
        }
        else{
            res.status(200)
            .json({success: true, msg: "Commend sent"})
        }
    })
    .catch(() => {
        res.status(400)
        .json({success: false, msg: "command not sent"})
    })
})

module.exports = router;