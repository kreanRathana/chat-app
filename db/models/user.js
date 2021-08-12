const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

//user schemas
const User = new mongoose.Schema({
    username:{
        type:String, 
        require:true,
    },
    email:{
        type:String,
        require: true,
    },
    password:{
        type:String,
        require: true,
    }

});



module.exports = mongoose.model('User',User);