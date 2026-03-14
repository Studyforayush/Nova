import mongoose from 'mongoose';

let courseSchema = new mongoose.Schema({
   
    courseTitle: {
        type: String,
        // required:true
    },
    courseDescription: {
        type: String
    },
    coursePrice: {
        type: String
    },
    courseImage: {
        type: String
    },
    courseChapters: [],
    courseCategory: {
        type: String
    },
    teacherId:{
        type:String
    },
    teacherName:{
        type:String
    },
    courseQuiz: []
}, { timestamps: true })

const courseModel = mongoose.model('Courses', courseSchema, 'courses');

export default courseModel;