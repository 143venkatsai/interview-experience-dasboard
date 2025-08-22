const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://venkatsaipelluru:63uqn7BgkMkfZvBM@cluster0.eas4bqr.mongodb.net/interview-dashboard?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/admin", adminRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});