/*
MIDTERM TEST  
Filename:controller.js
Student name:Roshan Khatri
Studnet id:200575702
Date: 2024/02/23
 */
const mongoose = require('mongoose');
var express = require('express');
const Task = require('../model/task'); 
const fs = require('fs');

// to get all task
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}, { _id: 1, title: 1, status: 1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//to get task group by status
exports.getTasksByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const tasks = await Task.find({ status });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// to get task by details
exports.getTaskDetails = async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
;
//to get all users
exports.getUser= async (req, res) => {
    const tasks = await Task.find();
    const users = tasks.map(task => task.assignedTo);
    res.json(users);
  };


//to get detailed profile user information.
exports.getUsername = async (req, res) => {
    
  const username = req.params.username;
    try {
        // Find the task assigned to the user based on the provided username
        const task = await Task.findOne({ assignedTo: username });

        if (task) {
            
            res.json({
                username: task.assignedTo,
                taskId: task.taskId,
                title: task.title,
                description: task.description,
                status: task.status
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};