var mongoose = require('mongoose');

var UserSessionSchema = mongoose.Schema({
    userID: {
        type: String,
        default: ''
    },
    timestamp: {
        type:Date,
        default:Date.now()
    },
    isDeleted: {
        type:Boolean,
        default:false
    }
});

var UserSession = module.exports = mongoose.model('UserSession', UserSessionSchema);