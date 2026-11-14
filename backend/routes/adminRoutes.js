import express from 'express';
import { getAdminDashboard, getAllStudents, getAllFaculty } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getAdminDashboard);
router.get('/students', getAllStudents);
router.get('/faculty', getAllFaculty);

export default router;
