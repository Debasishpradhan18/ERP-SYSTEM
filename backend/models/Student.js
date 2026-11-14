import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: String,
      default: 'B.Tech',
    },
    department: {
      type: String,
      default: 'Computer Science & Engineering',
    },
    currentSemester: {
      type: Number,
      default: 6,
    },
    academicYear: {
      type: String,
      default: '2025-2026',
    },
    batch: {
      type: String,
      default: 'Final Year',
    },
    sgpa: {
      type: Number,
      default: 8.42,
    },
    cgpa: {
      type: Number,
      default: 8.31,
    },
    proctor: {
      name: {
        type: String,
        default: 'Dr. Anand Sharma',
      },
      email: {
        type: String,
        default: 'anand.sharma@campuserp.edu',
      },
      phone: {
        type: String,
        default: '+91 98765 43210',
      },
      department: {
        type: String,
        default: 'Computer Science & Engineering',
      },
      cabin: {
        type: String,
        default: 'Block B - 302',
      },
    },
    totalFee: {
      type: Number,
      default: 60000,
    },
    paidFee: {
      type: Number,
      default: 55000,
    },
    dueFee: {
      type: Number,
      default: 5000,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;
