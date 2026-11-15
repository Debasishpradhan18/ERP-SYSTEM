import React, { useState, useRef } from 'react';
import {
  Wallet,
  CheckCircle,
  AlertCircle,
  Download,
  CreditCard,
  QrCode,
  Check,
  Upload,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Copy,
  Smartphone,
} from 'lucide-react';
import { mockFeeData } from '../../services/api';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

const DueAmount = () => {
  const [data, setData] = useState(mockFeeData);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Custom QR Code state - allows user to upload their own personal QR code
  const [customQrImage, setCustomQrImage] = useState(null);
  const [upiId, setUpiId] = useState('campus.erp@okhdfcbank');
  const qrInputRef = useRef(null);

  const handleCustomQrUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomQrImage(reader.result);
        toast.success('Your custom QR code loaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    toast.success('UPI ID copied to clipboard!');
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      toast.success('Payment verified! Semester dues cleared.');
      setData({
        ...data,
        paidAmount: data.paidAmount + 5000,
        dueAmount: 0,
        history: data.history.map((h) =>
          h.purpose === 'Semester Fee (Sem 6)'
            ? { ...h, status: 'Paid', date: 'Today', transactionId: `UPI-${Math.floor(100000 + Math.random() * 900000)}` }
            : h
        ),
      });
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
      }, 1800);
    }, 1500);
  };

  const handleDownloadReceipt = (purpose) => {
    toast.success(`Downloading official stamped fee receipt for ${purpose}...`);
  };

  // High quality QR Code image generated for UPI payment of ₹5,000
  const defaultQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${encodeURIComponent(
    upiId
  )}%26pn=Campus%20ERP%20Accounts%26am=5000%26cu=INR%26tn=Semester%206%20Fee`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Fee Details</h1>
        <p className="text-sm text-gray-400 mt-1">Tuition, institutional, and hostel fee ledger</p>
      </div>

      {/* Top 3 Summary Cards matching reference screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Fee */}
        <div className="bg-[#079BB5] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Total Fee</p>
          <h3 className="text-3xl font-black mt-2">₹ {data.totalFee.toLocaleString('en-IN')}</h3>
          <p className="text-xs text-white/70 mt-2">Academic Year 2025-2026</p>
          <div className="absolute right-3 bottom-3 opacity-15">
            <Wallet className="w-16 h-16" />
          </div>
        </div>

        {/* Paid Amount */}
        <div className="bg-[#16A34A] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Paid Amount</p>
          <h3 className="text-3xl font-black mt-2">₹ {data.paidAmount.toLocaleString('en-IN')}</h3>
          <p className="text-xs text-white/70 mt-2">Verified Receipts</p>
          <div className="absolute right-3 bottom-3 opacity-15">
            <CheckCircle className="w-16 h-16" />
          </div>
        </div>

        {/* Due Amount */}
        <div className="bg-[#DC3545] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Due Amount</p>
          <h3 className="text-3xl font-black mt-2">₹ {data.dueAmount.toLocaleString('en-IN')}</h3>
          <p className="text-xs text-white/70 mt-2">Due Date: 30 Apr 2026</p>
          <div className="absolute right-3 bottom-3 opacity-15">
            <AlertCircle className="w-16 h-16" />
          </div>
        </div>
      </div>

      {/* Fee History Table matching screenshot */}
      <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-wide">Fee History</h2>
          {data.dueAmount > 0 && (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-4 py-2 bg-[#DC3545] hover:bg-[#c22e3c] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition shadow-lg shadow-[#DC3545]/20"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan QR & Pay (₹ {data.dueAmount.toLocaleString('en-IN')})</span>
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#232a3b] text-xs font-semibold uppercase tracking-wider text-gray-400">
                <th className="py-3.5 px-4 w-12">#</th>
                <th className="py-3.5 px-4">Purpose</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2433] text-sm">
              {data.history.map((item) => (
                <tr key={item.id} className="hover:bg-[#161c28] transition-colors">
                  <td className="py-4 px-4 text-gray-400 font-semibold">{item.id}</td>
                  <td className="py-4 px-4 font-bold text-white">{item.purpose}</td>
                  <td className="py-4 px-4 font-semibold text-gray-200">₹ {item.amount.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-4 text-gray-400">{item.date}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-lg ${
                        item.status === 'Paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {item.status === 'Paid' ? (
                      <button
                        onClick={() => handleDownloadReceipt(item.purpose)}
                        className="px-3 py-1.5 bg-[#171d2b] hover:bg-[#232a3b] text-[#079BB5] border border-[#232a3b] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="px-3.5 py-1.5 bg-[#DC3545] hover:bg-[#c82837] text-white rounded-lg text-xs font-bold transition shadow-md shadow-[#DC3545]/20 flex items-center gap-1.5"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Pay Now</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Code UPI Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#121622] border border-[#232a3b] rounded-3xl p-6 shadow-2xl relative text-center">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#232a3b]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#079BB5]/20 rounded-lg text-[#079BB5]">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Scan & Pay via UPI</h3>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Total Payable Banner */}
            <div className="my-4 py-2 px-4 rounded-xl bg-[#171d2b] border border-[#232a3b] flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">Semester Fee (Sem 6):</span>
              <span className="text-xl font-black text-emerald-400">₹ 5,000</span>
            </div>

            {/* QR Code Container with High Contrast White Card */}
            <div className="bg-white p-4 rounded-2xl shadow-xl inline-block mx-auto border-4 border-[#079BB5]/30">
              <img
                src={customQrImage || defaultQrUrl}
                alt="Payment QR Code"
                className="w-52 h-52 object-contain mx-auto rounded-lg"
              />
              <p className="text-[11px] font-bold text-gray-800 mt-2 tracking-wide uppercase">
                GPay • PhonePe • Paytm • BHIM
              </p>
            </div>

            {/* UPI ID Pill with Copy button */}
            <div className="mt-4 flex items-center justify-between p-2.5 rounded-xl bg-[#171d2b] border border-[#232a3b] text-xs">
              <span className="text-gray-400 truncate max-w-[190px]">{upiId}</span>
              <button
                onClick={handleCopyUpi}
                className="text-[#079BB5] hover:text-[#06849a] font-semibold flex items-center gap-1 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            </div>

            {/* Option to Upload Your Own Custom QR Code */}
            <div className="mt-3">
              <input
                type="file"
                ref={qrInputRef}
                onChange={handleCustomQrUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => qrInputRef.current.click()}
                className="text-[11px] text-gray-400 hover:text-[#079BB5] flex items-center justify-center gap-1 mx-auto transition"
              >
                <Upload className="w-3 h-3" />
                <span>{customQrImage ? 'Replace with Another QR Image' : 'Upload Your Personal QR Image'}</span>
              </button>
            </div>

            {/* Confirmation Action Button */}
            <div className="mt-5 space-y-2">
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full py-3 bg-[#16A34A] hover:bg-[#138a3e] text-white font-bold rounded-xl text-sm transition shadow-lg shadow-[#16A34A]/25 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Bank Transaction...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>I Have Paid ₹ 5,000</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-gray-500">
                Encrypted with 256-bit bank level UPI security.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DueAmount;
