import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';
import { Button, TextField } from '@mui/material';

const TaskForm = ({ currentTask, setCurrentTask, fetchTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
            setCompleted(currentTask.completed);
        } else {
            setTitle('');
            setDescription('');
            setCompleted(false);
        }
    }, [currentTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentTask) {
            await updateTask(currentTask.id, { title, description, completed });
        } else {
            await createTask({ title, description, completed });
        }
        fetchTasks();
        setCurrentTask(null);
        setTitle('');
        setDescription('');
        setCompleted(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <label>
                Completed:
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                />
            </label>
            <Button type="submit" variant="contained" color="primary">
                {currentTask ? 'Update Task' : 'Add Task'}
            </Button>
        </form>
    );
};

export default TaskForm;