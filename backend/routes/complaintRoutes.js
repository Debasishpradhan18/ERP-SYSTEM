import express from 'express';
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
} from '../controllers/complaintController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', authorize('student'), upload.single('attachment'), createComplaint);
router.get('/my', authorize('student'), getMyComplaints);
router.get('/', authorize('admin', 'faculty'), getAllComplaints);
router.put('/:id', authorize('admin', 'faculty'), updateComplaintStatus);

export default router;
