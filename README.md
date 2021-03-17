TRUCKX (Assignment 1)
To Develop Backend configuration for the functioning of a Dashcam ( A Camera used to record the events such as accident, speed alert, etc ) for a vehical protection ,
that have  the ability to upload all the events to server and can be viewed anytime.



The Stack configuration used for the development is Node, MongoDB, Express.js


External libraries used for uploads (Multer)


file structure:

server.js (acting as the main file to initiate the server)

models - (contains the schema of the tables used.)
    1) Dashcam 
    2) Alarm
  
  
routes - (contains all the endpoints that will be used to call a perticular service)
    1) Dashcam
    2) Alarm
    
All the uploading is done under routes/alarm.js
