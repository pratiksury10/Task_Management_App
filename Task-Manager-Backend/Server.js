const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/tasks')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

//Use the task routes
app.use('/tasks',taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});