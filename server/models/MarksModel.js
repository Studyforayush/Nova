import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
    student_id: { type: String, required: true },
    subject: { type: String, required: true },
    score: { type: Number, required: true },
    exam_type: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Marks', marksSchema);
