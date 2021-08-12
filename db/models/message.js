const mongooose = require('mongoose');

// messaging schemas

const Message = new mongoose.Schemas({
    message:{
        type:String,
        require:true
    },
    date: {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Message',Message);