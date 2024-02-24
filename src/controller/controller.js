/*
MIDTERM TEST  
Filename:
Student name:Roshan Khatri
Studnet id:200575702
Date: 2024/02/23
 */
const mongoose = require('mongoose');
var express = require('express');
const Task = require('../model/task'); 
const fs = require('fs');


exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}, { _id: 1, title: 1, status: 1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTasksByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const tasks = await Task.find({ status });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
exports.getUser= async (req, res) => {
    const tasks = await Task.find();
    const users = tasks.map(task => task.assignedTo);
    res.json(users);
  };

//   exports.getUsername= async  (req, res) => {
//    // const username = req.params.username;
//     const username = "Alex Johnson";
//     // Find the task assigned to the user based on the provided username
//     const task = Task.find(task => task.assignedTo === username);

//     if (task) {
//         // If task is found, return detailed information
//         res.json({
//             username: task.assignedTo,
//             taskId: task.taskId,
//             title: task.title,
//             description: task.description,
//             status: task.status
//         });
//     } else {
//         // If user is not found, return 404 Not Found
//         res.status(404).json({ error: 'User not found' });
//     }
// };

exports.getUsername = async (req, res) => {
    //const username = "Alex Johnson"; // Assuming hardcoded username for demonstration
  const username = req.params.username;
    try {
        // Find the task assigned to the user based on the provided username
        const task = await Task.findOne({ assignedTo: username });

        if (task) {
            // If task is found, return detailed information
            res.json({
                username: task.assignedTo,
                taskId: task.taskId,
                title: task.title,
                description: task.description,
                status: task.status
            });
        } else {
            // If user is not found, return 404 Not Found
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the database operation
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};