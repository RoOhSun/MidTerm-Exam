/*
MIDTERM TEST  
Filename:
Student name:Roshan Khatri
Studnet id:200575702
Date: 2024/02/23
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining schema for the task model
const taskSchema = new Schema({
    taskId: {type: Number},
    title: {type: String},
    description: {type: String},
    status: {type: String},
    assignedTo:{type: String}
  
})
const Task = mongoose.model('task', taskSchema);

module.exports = Task;