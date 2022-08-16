const mongoose = require('mongoose');

const successCaseSchema = new mongoose.Schema({
    animal:{type:mongoose.Schema.Types.ObjectId, ref:'Animal'},
})

module.exports = mongoose.model('SuccessCase', successCaseSchema);
