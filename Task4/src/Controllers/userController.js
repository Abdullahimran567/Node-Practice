const express =require('express')
const { post } = require('../Routes/authRoutes')
const Task = require('../models/Tasks')
const User = require('../models/User')

const postTask = async (req, res) => {

    try {
    const {name , description } = req.body;
    const userId = req.userId;


    if(!name || !description) {
        return res.status(400).json({err : 'Name or description of task not added'})
    }

    const check = await Task.find({name : name , userID : userId}) 
    if(check.length !== 0) {
        return res.status(409).json({err : "Same named task already exits"})
    }
    const task = await Task.create({name: name , description : description , userID : userId });

    res.status(201).json({msg : 'Task successfully created'})
    } catch (error) {
        res.status(500).json({msg: 'Internal Server error', error: error.message})
    }

}

const viewTask = async (req, res) => {
    const userId = req.userId;
    const { name } = req.query;
    

    let tasks = await Task.find({ userID: userId });


   


    if (!tasks || tasks.length === 0) {
        return res.status(404).json({ err: 'User dont have any registered tasks' });
    }

    if(name) {
        tasks = tasks.filter(t => t.name==name);
        return res.status(200).json({ msg: 'Task retrieval successful', tasks })
    }

    res.status(200).json({ msg: 'Task retrieval successful', tasks });
};


const deleteTask = async (req ,res)=> {

    const {name} = req.query
    const userId = req.userId;

    if(!name) {
        return res.status(400).json({err : "Enter name of task to be deleted"})
    }

    const task = await Task.findOne({name : name , userID :userId })

    if(!task || task.length===0) {
      return   res.status(404).json({err: "Task with that name doesnt exists"})
    }

    await Task.deleteOne({name : name

    })

    res.status(200).json({msg : 'Task deleted successfully'})
}


const updateTask = async (req ,res)=> {
    const userId = req.userId;
    const {name} = req.query
    const {description } = req.body

     if(!name) {
        return res.status(400).json({err : "Enter name of task to be deleted"})
    }

    const task = await Task.findOne({name : name , userID :userId })

    if(!task || task.length===0) {
      return   res.status(404).json({err: "Task with that name doesnt exists"})
    }

    await Task.updateOne({name : name , userID : userId} , {$set : {description : description}})

    res.status(200).json({msg : "Task successfully updated" })
}
module.exports = {postTask , viewTask  , deleteTask , updateTask}