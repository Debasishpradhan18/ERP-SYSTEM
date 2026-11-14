import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  studentName: String,
  fileUrl: String,
  submittedAt: { type: Date, default: Date.now },
  grade: String,
  feedback: String,
});

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    faculty: { type: String, required: true },
    semester: { type: Number, default: 6 },
    dueDate: { type: Date, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String, default: '' },
    submissions: [submissionSchema],
  },
  { timestamps: true }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;
