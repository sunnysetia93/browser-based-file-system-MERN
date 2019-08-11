const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    displayName: String,
    username: String,
    password: String
});

mongoose.model('User', userSchema);
