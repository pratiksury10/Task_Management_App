"use client"
import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Container, Typography } from '@mui/material';
import { getTasks } from '../services/taskService'; // Import the getTasks function

const Home = () => {
    const [currentTask, setCurrentTask] = useState(null);
    const [tasks, setTasks] = useState([]); // State to hold the list of tasks

    // Function to fetch tasks from the API
    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response); // Update the tasks state with the fetched tasks
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    // Fetch tasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Task Management Application
            </Typography>
            <TaskForm currentTask={currentTask} setCurrentTask={setCurrentTask} fetchTasks={fetchTasks} />
            <TaskList tasks={tasks} onEdit={setCurrentTask} fetchTasks={fetchTasks} /> {/* Pass tasks and fetchTasks to TaskList */}
        </Container>
    );
};

export default Home;