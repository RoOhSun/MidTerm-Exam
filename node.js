/*
MIDTERM TEST  
Filename:node.js
Student name:Roshan Khatri
Studnet id:200575702
Date: 2024/02/23
 */

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./src/routes/routes');
const cors = require('cors');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');



app.use(express.json());

app.use(bodyParser.json());

dotenv.config({ path: './config.env' });

const InitiateMongoServer = require('./db');
InitiateMongoServer();

mongoose.connect(process.env.MONGODB_URL).then(() => {
    importData();
});

// Read the data from task.json
const data = JSON.parse(fs.readFileSync('./task.json', 'utf-8'));

// Import data to MongoDB if the collection is empty
const importData = async () => {
    try {
        const Task = require('./src/model/task');
        const count = await Task.countDocuments();
        if (count === 0) {
            await Task.create(data);
            console.log('Data successfully imported to MongoDB');
        } else {
            console.log('Data already exists in the database');
        }
    } catch (e) {
        console.log("Error importing the data", e);
    }
};

app.use('/', taskRoutes);

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html as the default document
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const port = 3000;



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});