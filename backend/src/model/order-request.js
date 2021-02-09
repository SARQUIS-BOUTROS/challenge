const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderRequest = new Schema ({
    subject: String,
    body: String,
    date: Date
});

module.exports = mongoose.model('orderrequest', orderRequest)