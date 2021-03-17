//Schema for the dashcam and location updates

const mongoose = require("mongoose");

const dashcam = mongoose.Schema({
    IMEI: {
        type: String,
    },
    login:{
        type: Date,
        default: Date.now()
    },
    location_time: {
        type: Date,
        default: Date.now()
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    command: {
        type: String,
        default: ""
    }

})

module.exports = mongoose.model("Dashcam", dashcam)