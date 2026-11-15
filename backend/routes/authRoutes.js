import express from 'express';
import { login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import User from '../models/User.js';
import { User as UserSQL } from '../models/sql/index.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);

// Update Profile Picture endpoint
router.post('/avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image file to upload' });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;

    // Update in MySQL if active
    try {
      await UserSQL.update({ avatar: avatarUrl }, { where: { id: req.user.id } });
    } catch (e) {
      // Fallback update in Mongoose
      try {
        await User.findByIdAndUpdate(req.user.id, { avatar: avatarUrl });
      } catch (err) {}
    }

    res.json({
      success: true,
      message: 'Profile picture updated successfully',
      avatar: avatarUrl,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to upload profile picture', error: error.message });
  }
});

export default router;
