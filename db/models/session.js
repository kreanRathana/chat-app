const mongoose = require('mongoose');

// session user token schemas

const Session = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    accessToken:{
        type:String,
        require:true,
    },
    refresToken:{
        type:String,
        require:true,
    }
});

module.exports = mongoose.model('Session',Session);