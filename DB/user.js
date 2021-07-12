const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username:{
        type: String
    },
    email:{
        type: String
    },
    hash:{
        type: String
    }
});

module.exports = User = mongoose.model('user', user);