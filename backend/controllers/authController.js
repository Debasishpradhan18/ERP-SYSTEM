import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import { User as UserSQL, Student as StudentSQL, Faculty as FacultySQL } from '../models/sql/index.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'campus_erp_super_secret_jwt_key_2026_secure', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Auth user & get token (supports Email OR Roll Number / Username)
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    const loginIdentifier = (email || username || '').trim();

    if (!loginIdentifier || !password) {
      return res.status(400).json({ success: false, message: 'Please provide Username/Email and Password' });
    }

    let user = null;
    let studentProfile = null;
    let facultyProfile = null;

    // Try finding via MySQL first if available
    try {
      if (loginIdentifier.includes('@')) {
        user = await UserSQL.findOne({ where: { email: loginIdentifier } });
      } else {
        // Find by roll number in students table
        const studentRecord = await StudentSQL.findOne({ where: { rollNumber: loginIdentifier } });
        if (studentRecord) {
          user = await UserSQL.findByPk(studentRecord.userId);
        }
      }
    } catch (sqlErr) {
      // Fallback to Mongoose
      if (loginIdentifier.includes('@')) {
        user = await User.findOne({ email: loginIdentifier }).select('+password');
      } else {
        const studentRecord = await Student.findOne({ rollNumber: loginIdentifier });
        if (studentRecord) {
          user = await User.findById(studentRecord.user).select('+password');
        }
      }
    }

    // Secondary fallback to Mongoose if user not found in SQL
    if (!user) {
      try {
        if (loginIdentifier.includes('@')) {
          user = await User.findOne({ email: loginIdentifier }).select('+password');
        } else {
          const studentRecord = await Student.findOne({ rollNumber: loginIdentifier });
          if (studentRecord) {
            user = await User.findById(studentRecord.user).select('+password');
          }
        }
      } catch (err) {}
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid Username/Email or Password' });
    }

    // Verify password
    let isMatch = false;
    if (typeof user.matchPassword === 'function') {
      isMatch = await user.matchPassword(password);
    } else {
      const bcrypt = (await import('bcryptjs')).default;
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid Username/Email or Password' });
    }

    const token = generateToken(user.id || user._id);

    // Retrieve profile details
    try {
      if (user.role === 'student') {
        studentProfile = (await StudentSQL.findOne({ where: { userId: user.id } })) || (await Student.findOne({ user: user._id }));
      } else if (user.role === 'faculty') {
        facultyProfile = (await FacultySQL.findOne({ where: { userId: user.id } })) || (await Faculty.findOne({ user: user._id }));
      }
    } catch (e) {}

    res.json({
      success: true,
      token,
      user: {
        id: user.id || user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phoneNumber: user.phoneNumber,
        batch: studentProfile?.batch || 'B.Tech CSE | Final Year',
        department: studentProfile?.department || user.department || 'Computer Science & Engineering',
        profile: studentProfile || facultyProfile,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
