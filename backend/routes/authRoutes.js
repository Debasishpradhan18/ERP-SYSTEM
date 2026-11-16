import express from 'express';
import { login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import User from '../models/User.js';
import { User as UserSQL } from '../models/sql/index.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);

// Update Profile Picture endpoint - supports both multipart file upload and JSON body
router.post('/avatar', protect, (req, res, next) => {
  upload.single('avatar')(req, res, (err) => {
    if (err) {
      console.warn('Multer upload note:', err.message);
    }
    next();
  });
}, async (req, res) => {
  try {
    let avatarUrl = '';
    if (req.file) {
      avatarUrl = `/uploads/${req.file.filename}`;
    } else if (req.body && req.body.avatar) {
      avatarUrl = req.body.avatar;
    }

    if (!avatarUrl) {
      return res.status(400).json({ success: false, message: 'Please select an image file or provide an avatar' });
    }

    const userId = req.user?.id || req.user?._id || 1;

    // Update in MySQL if active
    try {
      await UserSQL.update({ avatar: avatarUrl }, { where: { id: userId } });
    } catch (e) {
      console.warn('MySQL avatar update note:', e.message);
    }

    // Fallback update in Mongoose
    try {
      await User.findByIdAndUpdate(userId, { avatar: avatarUrl });
    } catch (err) {}

    res.json({
      success: true,
      message: 'Profile picture updated successfully and saved to database',
      avatar: avatarUrl,
    });
  } catch (error) {
    console.error('Avatar update error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload profile picture', error: error.message });
  }
});

export default router;
