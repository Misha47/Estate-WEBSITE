import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: false
    },

    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/estate-db.appspot.com/o/defaultProfile.png?alt=media&token=7a31da47-0aa9-418e-912c-5f78187de03c"
    }
}, {timestamps: true});

const USER = mongoose.model('ESTATE_AGENT', UserSchema);

export default USER;