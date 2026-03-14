import express from 'express';
import FacultyModel from '../models/FacultyModel.js';

const router = express.Router();

// GET /api/faculty
router.get('/', async (req, res) => {
    try {
        const faculty = await FacultyModel.find({});
        res.status(200).json({ success: true, data: faculty });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/faculty
router.post('/', async (req, res) => {
    try {
        const faculty = new FacultyModel(req.body);
        await faculty.save();
        res.status(201).json({ success: true, data: faculty });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
