const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// In-memory tasks array
let tasks = [];

// Load tasks from JSON file if it exists
const loadTasks = () => {
    const filePath = path.join(__dirname, '../tasks.json');
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        tasks = JSON.parse(data);
    }
};

// Save tasks to JSON file
const saveTasks = () => {
    const filePath = path.join(__dirname, '../tasks.json');
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// Load tasks on server start
loadTasks();

// CRUD Operations
router.get('/', (req, res) => {
    res.json(tasks);
});

router.post('/', (req, res) => {
    const newTask = { id: Date.now(), ...req.body };
    tasks.push(newTask);
    saveTasks();
    res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id == id);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...req.body };
        saveTasks();
        res.json(tasks[index]);
    } else {
        res.status(404).send('Task not found');
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id != id);
    saveTasks();
    res.status(204).send();
});

module.exports = router;