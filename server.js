const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");


// middlewares
app.use(express.json());
app.use("/login", require("./routes/dashcam"))
app.use('/alarm', require("./routes/alarm"))
app.use('/uploads', express.static('uploads') )


// server start commands
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Server listining to ${port}.`)
})


// mongoDB connection commands
mongoose.connect("mongodb+srv://luvsam:luvsam@cluster0.muyhd.mongodb.net/TRUCKX_1?retryWrites=true&w=majority",
                  { useNewUrlParser: true,
                    useUnifiedTopology: true
                  } 
                )
.then(() => {
    console.log("MongoDB is connected")
}).catch(() => {
    console.log("MongoDB Disconnected")
})