import mongoose from 'mongoose';

const paymentHistorySchema = new mongoose.Schema({
  purpose: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, default: '' },
  paymentMethod: { type: String, default: 'Online / NetBanking' },
  transactionId: { type: String, default: '' },
  status: { type: String, enum: ['Paid', 'Due', 'Pending', 'Failed'], default: 'Paid' },
  receiptUrl: { type: String, default: '' },
});

const feeSchema = new mongoose.Schema(
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
    totalFee: {
      type: Number,
      required: true,
      default: 60000,
    },
    paidAmount: {
      type: Number,
      required: true,
      default: 55000,
    },
    dueAmount: {
      type: Number,
      required: true,
      default: 5000,
    },
    dueDate: {
      type: String,
      default: '30 Apr 2026',
    },
    history: [paymentHistorySchema],
  },
  { timestamps: true }
);

const Fee = mongoose.model('Fee', feeSchema);
export default Fee;
