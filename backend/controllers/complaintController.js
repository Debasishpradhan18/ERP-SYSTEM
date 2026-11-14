import Complaint from '../models/Complaint.js';
import Student from '../models/Student.js';

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Private (Student)
export const createComplaint = async (req, res) => {
  try {
    const { category, title, description, priority } = req.body;
    const student = await Student.findOne({ user: req.user.id });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }

    if (!category || !title || !description) {
      return res.status(400).json({ success: false, message: 'Please provide category, title, and description' });
    }

    // Generate unique ticket ID, e.g. #CMP1604
    const ticketId = `#CMP${Math.floor(1000 + Math.random() * 9000)}`;

    const attachmentUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const complaint = await Complaint.create({
      ticketId,
      student: student._id,
      category,
      title,
      description,
      priority: priority || 'Medium',
      attachment: attachmentUrl,
      status: 'Under Review',
    });

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      complaint,
    });
  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({ success: false, message: 'Failed to create complaint', error: error.message });
  }
};

// @desc    Get current student's complaints
// @route   GET /api/complaints/my
// @access  Private (Student)
export const getMyComplaints = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    const complaints = await Complaint.find({ student: student._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching complaints', error: error.message });
  }
};

// @desc    Get all complaints (Admin/Faculty)
// @route   GET /api/complaints
// @access  Private (Admin, Faculty)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate({
      path: 'student',
      populate: { path: 'user', select: 'name email rollNumber' },
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching all complaints', error: error.message });
  }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
// @access  Private (Admin, Faculty)
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status, adminResponse } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    if (status) complaint.status = status;
    if (adminResponse) complaint.adminResponse = adminResponse;
    if (status === 'Resolved') complaint.resolvedAt = new Date();

    await complaint.save();

    res.json({
      success: true,
      message: 'Complaint updated successfully',
      complaint,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating complaint', error: error.message });
  }
};
