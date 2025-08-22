const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: { type: String, required: true },
    date: {type: Date, required: true},
    company: { type: String, required: true },
    rounds:[{roundName: {type:String, required: true}, questions: {type: String, required: true}}],
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});

module.exports = mongoose.model('Task', taskSchema);