import express from 'express';
import StudentModel from '../models/StudentModel.js';
import FacultyModel from '../models/FacultyModel.js';
import MarksModel from '../models/MarksModel.js';
// import AttendanceModel from '../models/AttendanceModel.js';
import { OpenAI } from 'openai';

const router = express.Router();

let openai;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// GET /api/analytics/student-performance
router.get('/student-performance', async (req, res) => {
    try {
        const marks = await MarksModel.find({});
        res.status(200).json({ success: true, data: marks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/analytics/faculty-performance
router.get('/faculty-performance', async (req, res) => {
    try {
        const faculty = await FacultyModel.find({});
        res.status(200).json({ success: true, data: faculty });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/analytics/ai-insights
router.get('/ai-insights', async (req, res) => {
    try {
        const students = await StudentModel.find({});
        const marks = await MarksModel.find({});
        
        // Basic rule-based insight generation
        let insights = [];
        
        let weakCount = 0;
        marks.forEach(m => {
            if (m.score < 50) weakCount++;
        });
        
        if (weakCount > 0) {
            insights.push(`${weakCount} recorded exam instances show underperformance (score < 50).`);
        } else {
            insights.push('Overall student performance is satisfactory across recorded exams.');
        }

        const lowAttendance = students.filter(s => s.attendance_percentage < 75);
        if (lowAttendance.length > 0) {
            insights.push(`${lowAttendance.length} students have attendance below 75%.`);
        }

        // Output formatting
        let finalOutput = insights.join(' ');

        // Optionally override with AI if configured
        if (openai && students.length > 0 && marks.length > 0) {
            const prompt = `Based on the system academic data, generate a one-line insight detecting weak subjects and attendance trends. We have ${students.length} students, ${weakCount} low scores.`;
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: "You are an AI academic analyst." }, { role: "user", content: prompt }],
                model: "gpt-3.5-turbo",
            });
            finalOutput = completion.choices[0].message.content;
        }

        res.status(200).json({ success: true, data: { insights: finalOutput } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
