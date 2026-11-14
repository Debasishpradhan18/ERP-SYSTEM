import Notice from '../models/Notice.js';

// @desc    Get all notices
// @route   GET /api/notices
// @access  Public / Authenticated
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json({ success: true, count: notices.length, notices });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving notices', error: error.message });
  }
};

// @desc    Create a notice
// @route   POST /api/notices
// @access  Private (Admin)
export const createNotice = async (req, res) => {
  try {
    const { title, category, content, isImportant } = req.body;
    const notice = await Notice.create({
      title,
      category,
      content,
      isImportant: isImportant || false,
      postedBy: req.user.name,
    });
    res.status(201).json({ success: true, message: 'Notice posted', notice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error posting notice', error: error.message });
  }
};
