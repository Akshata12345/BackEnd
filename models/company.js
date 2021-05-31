const mongoose = require('mongoose');

var Company = mongoose.model('Company' , {
    name: { type: String} ,
    code: { type: String},
    location: { type: String}
},'companies');

module.exports = {Company}

