import express from 'express';
import {
  getStudentDashboard,
  getStudentAttendance,
  getStudentExamination,
  getStudentTimetable,
  getStudentFees,
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('student', 'admin'));

router.get('/dashboard', getStudentDashboard);
router.get('/attendance', getStudentAttendance);
router.get('/examination', getStudentExamination);
router.get('/timetable', getStudentTimetable);
router.get('/fees', getStudentFees);

export default router;
