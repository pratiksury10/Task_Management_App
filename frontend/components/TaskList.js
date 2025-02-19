import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import { Button, Table } from '@mui/material';

const TaskList = ({ tasks, onEdit }) => {
    const [taskList, setTaskList] = useState(tasks);

    useEffect(() => {
        setTaskList(tasks);
    }, [tasks]);

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTaskList(taskList.filter(task => task.id !== id));
    };

    return (
        <Table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Completed</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {taskList.map(task => (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.completed ? 'Yes' : 'No'}</td>
                        <td>
                            <Button variant="contained" color="primary" onClick={() => onEdit(task)}>Edit</Button>
                            <Button variant="contained" color="secondary" onClick={() => handleDelete(task.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TaskList;