const mongoose = require('mongoose');

var Employee = mongoose.model('Employee' , {
    name: { type: String} ,
    email: { type: String},
    company: { type: String},
    department: { type: String},
    role: { type: String}
},'employees');

module.exports = {Employee}