import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { User as UserSQL } from '../models/sql/index.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Support fallback demo token gracefully
      if (token === 'demo_token_xyz_123') {
        let sqlUser = null;
        try {
          sqlUser = await UserSQL.findOne({ where: { role: 'student' }, attributes: { exclude: ['password'] } });
        } catch (e) {}

        req.user = sqlUser || {
          id: 1,
          _id: 1,
          name: 'Debasish Pradhan',
          email: 'student@campus.edu',
          role: 'student',
        };
        return next();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'campus_erp_super_secret_jwt_key_2026_secure');

      // 1. Try finding user in MySQL first
      let user = null;
      try {
        user = await UserSQL.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
      } catch (sqlErr) {}

      // 2. Fallback to Mongoose if not found in SQL
      if (!user) {
        try {
          user = await User.findById(decoded.id).select('-password');
        } catch (mongoErr) {}
      }

      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found for this token' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user?.role || 'Guest'}' is not authorized to access this route`,
      });
    }
    next();
  };
};
