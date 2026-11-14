import express from 'express';
import { getNotices, createNotice } from '../controllers/noticeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getNotices);
router.post('/', protect, authorize('admin'), createNotice);

export default router;
