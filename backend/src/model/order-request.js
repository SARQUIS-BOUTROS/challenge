const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderRequest = new Schema ({
    title: String,
    body: String
});

module.exports = mongoose.model('orderrequest', orderRequest)