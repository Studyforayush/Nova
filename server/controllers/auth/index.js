import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'codeforindia';
router.get('/verify', async (req, res) => {
    try {
        let token = req.headers.token
        req.payload = jwt.verify(token, JWT_SECRET);
        if (req.payload) {
            return res.json(req.payload)
        }
    } catch (error) {
        return res.status(401).json({ error: 'Session Expired, please login' });
    }

})
export default router;