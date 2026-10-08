require('dotenv').config()

const express = require('express')
const mongoose =require('mongoose')
const workoutRoutes=require('./routes/workout')

const app = express();

//MIDDLEWARE
app.use(express.json())

//MIDDLEWARE
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
//routes or router connect
app.use('/api/workouts',workoutRoutes)
//mongoose connect , connected port under the mongoose URI
mongoose.connect(process.env.MONG_URI)
   .then(()=>{
      app.listen(process.env.PORT,()=>{
        console.log('Connected to db & listening on port ',process.env.PORT)
      })
   })
   .catch((error)=>{
      console.log(error)
   })
