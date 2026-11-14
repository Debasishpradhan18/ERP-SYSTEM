import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Academic', 'Examination', 'Fees', 'Events', 'General'],
      default: 'Academic',
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    attachment: {
      type: String,
      default: '',
    },
    postedBy: {
      type: String,
      default: 'Admin Dean Office',
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notice = mongoose.model('Notice', noticeSchema);
export default Notice;
