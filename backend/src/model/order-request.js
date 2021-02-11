const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderRequest = new Schema ({
    subject: String,
    body: String,
    code:
        {
            type: String,
            unique: true
        },
    filename: String,
    date_created: Date,
    date_updated: Date,
    rejected: String,
    ready: String,
    status: String
});



module.exports = mongoose.model('orderrequest', orderRequest)