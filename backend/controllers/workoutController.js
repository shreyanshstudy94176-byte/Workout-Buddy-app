const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
//GET ALL WORKOUTS
const getWorkouts=async (req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//GET A single WORKOUT
const getWorkout=async (req,res)=>{
    const {id}=req.params

    //FOR INVALID ID TYPED
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'error , no such workout'})
    }

    const workout=await Workout.findById(id)

    //FOR VALID ID BUT NOT FOUND
    if(!workout){
        return res.status(404).json({error: 'workout not found'})
    }
    res.status(200).json(workout)
}


//CREATE A NEW WORKOUT
const createWorkout = async (req,res)=>{
    const {title,load,reps}=req.body

    try{
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//DELETE A WORKOUT
const deleteWorkout = async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findByIdAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error: 'workout not found'})
    }
    res.status(200).json(workout)
}
//UPDATE A WORKOUT
const updateWorkout=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout=await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!workout){
        return res.status(404).json({error: 'workout not found'})
    }
    res.status(200).json(workout)
}

module.exports={
    deleteWorkout,
    getWorkout,
    getWorkouts,
    createWorkout,
    updateWorkout
}