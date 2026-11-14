import express from 'express';
import { getFacultyDashboard, markAttendance } from '../controllers/facultyController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('faculty', 'admin'));

router.get('/dashboard', getFacultyDashboard);
router.post('/attendance', markAttendance);

export default router;
