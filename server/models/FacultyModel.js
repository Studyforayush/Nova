import mongoose from "mongoose";

let facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    faculty_id: {
        type: String,
    },
    department: {
        type: String,
    },
    subject: {
        type: String,
    },
    feedback_score: {
        type: Number,
        default: 0
    },
    mobileNumber: {
        type: String,
        // required: true
    },
    password:{
        type:String,
    },
    courses: [{
        type: String
    }],
    address: String,
    description: {
        type: String
    },
    isVerified: {
        email: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Boolean,
            default: false
        }
    },
    role: {
        type: String
    }
}, { timestamps: true })

const facultyModel = mongoose.model('Faculty', facultySchema, 'faculty');

export default facultyModel;