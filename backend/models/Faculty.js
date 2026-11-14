import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      default: 'Assistant Professor',
    },
    qualification: {
      type: String,
      default: 'Ph.D. in Computer Science',
    },
    assignedSubjects: [
      {
        subjectName: String,
        subjectCode: String,
        semester: Number,
        type: { type: String, enum: ['Theory', 'Lab'] },
      },
    ],
  },
  { timestamps: true }
);

const Faculty = mongoose.model('Faculty', facultySchema);
export default Faculty;
