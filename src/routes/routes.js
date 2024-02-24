/*
MIDTERM TEST  
Filename:
Student name:Roshan Khatri
Studnet id:200575702
Date: 2024/02/23
 */
const express = require('express');
const router = express.Router();
const Task = require('../model/task.js'); 
const TaskController = require('../controller/controller.js');

router.get('/task', TaskController.getAllTasks);
router.get('/users', TaskController.getUser);
router.get('/tasks/status/:status', TaskController.getTasksByStatus);
router.get('/task/:taskId', TaskController.getTaskDetails);
router.get('/user/:username', TaskController.getUsername);

module.exports = router;