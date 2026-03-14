import 'dotenv/config';
import mongoose from 'mongoose';
import './dbConnect.js'; // Ensure this connects to MongoDB properly
import StudentModel from './models/StudentModel.js';
import FacultyModel from './models/FacultyModel.js';

async function createTestUsers() {
    try {
        console.log("Waiting for DB connection...");
        // Wait a bit for dbConnect to finish
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create Test Student
        const existingStudent = await StudentModel.findOne({ email: 'student@test.com' });
        let studentId;
        if (!existingStudent) {
            const student = new StudentModel({
                name: 'Test Student',
                email: 'student@test.com',
                password: 'password123',
                mobileNumber: '1234567890',
                role: 'student'
            });
            await student.save();
            studentId = student._id;
            console.log("Created Test Student:", studentId);
        } else {
            studentId = existingStudent._id;
            console.log("Existing Test Student found:", studentId);
        }

        // Create Test Faculty
        const existingFaculty = await FacultyModel.findOne({ email: 'faculty@test.com' });
        let facultyId;
        if (!existingFaculty) {
            const faculty = new FacultyModel({
                name: 'Test Faculty',
                email: 'faculty@test.com',
                password: 'password123',
                mobileNumber: '0987654321',
                role: 'faculty'
            });
            await faculty.save();
            facultyId = faculty._id;
            console.log("Created Test Faculty:", facultyId);
        } else {
            facultyId = existingFaculty._id;
            console.log("Existing Test Faculty found:", facultyId);
        }

        console.log("--- USE THESE CREDENTIALS FOR BYPASS ---");
        console.log("Student ID:", studentId.toString());
        console.log("Faculty ID:", facultyId.toString());
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

createTestUsers();
