import mongoose from "mongoose";

let studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    student_id: {
        type: String,
    },
    class: {
        type: String,
    },
    section: {
        type: String,
    },
    attendance_percentage: {
        type: Number,
        default: 0
    },
    marks: [],
    mobileNumber: {
        type: String,
        // required: true
    },
    password:{
        type:String,
    },
    courses: [],
    cart:[],
    address: String,
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

const studentModel = mongoose.model('Students', studentSchema, 'student');

export default studentModel;