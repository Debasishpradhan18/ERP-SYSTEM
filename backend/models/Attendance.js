import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    subjectCode: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: ['Theory', 'Lab'],
      default: 'Theory',
    },
    totalClasses: {
      type: Number,
      required: true,
      default: 0,
    },
    presentClasses: {
      type: Number,
      required: true,
      default: 0,
    },
    absentClasses: {
      type: Number,
      required: true,
      default: 0,
    },
    percentage: {
      type: Number,
      required: true,
      default: 0,
    },
    history: [
      {
        date: { type: Date, default: Date.now },
        status: { type: String, enum: ['Present', 'Absent', 'Excused'], default: 'Present' },
        markedBy: { type: String, default: 'Faculty' },
        remarks: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
