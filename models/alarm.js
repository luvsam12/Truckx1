const mongoose = require("mongoose");
const alarmMessage = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    IMEI: {
        type: String,
        required: true
    },
    alarm_type: {
        type: String,
        // required: true
    },
    alarm_time: {
        type: Date,
        default: Date.now()
    },
    latitude: {
        type: String,
        // required: true
    },
    longitude: {
        type: String,
        // required: true
    },
    file_list: {
        type: String
    }
})

module.exports = mongoose.model("alarm", alarmMessage)