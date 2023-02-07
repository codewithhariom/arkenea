const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    LastName: String,
    Email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    Phone: {
        type: Number,
        required: [true, 'Phone is required'],
    },
    ProfileImage: {
        type: String
    }

})

module.exports = User = mongoose.model('user', userShema)