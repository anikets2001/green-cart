import mongoose from 'mongoose';


// Schema for user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    cartItems:{
        type: Object,
        default: {},
    }
}, {minimize: false});

// Model for user
const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User;