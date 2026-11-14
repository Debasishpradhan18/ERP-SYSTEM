import mongoose from 'mongoose';

const subjectScoreSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  subjectCode: { type: String, default: '' },
  type: { type: String, default: 'Theory' },
  maxMarks: { type: Number, default: 100 },
  marksObtained: { type: Number, required: true },
  grade: { type: String, required: true },
  credits: { type: Number, default: 4 },
  internalMarks: { type: Number, default: 28 },
  maxInternal: { type: Number, default: 30 },
  externalMarks: { type: Number, default: 58 },
  maxExternal: { type: Number, default: 70 },
});

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      default: 6,
    },
    academicYear: {
      type: String,
      default: '2025-2026',
    },
    sgpa: {
      type: Number,
      required: true,
      default: 8.42,
    },
    cgpa: {
      type: Number,
      required: true,
      default: 8.31,
    },
    scores: [subjectScoreSchema],
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Result = mongoose.model('Result', resultSchema);
export default Result;
