import express from 'express';
import StudentModel from '../models/StudentModel.js';

const router = express.Router();

// GET /api/students
router.get('/', async (req, res) => {
    try {
        const students = await StudentModel.find({});
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/students
router.post('/', async (req, res) => {
    try {
        const student = new StudentModel(req.body);
        await student.save();
        res.status(201).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/students/:id
router.put('/:id', async (req, res) => {
    try {
        const updated = await StudentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/students/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await StudentModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
