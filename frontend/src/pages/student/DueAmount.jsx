import React, { useState } from 'react';
import { Wallet, CheckCircle, AlertCircle, Download, CreditCard, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { mockFeeData } from '../../services/api';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

const DueAmount = () => {
  const [data, setData] = useState(mockFeeData);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      toast.success('Fee of ₹5,000 paid successfully!');
      setData({
        ...data,
        paidAmount: data.paidAmount + 5000,
        dueAmount: 0,
        history: data.history.map((h) =>
          h.purpose === 'Semester Fee (Sem 6)'
            ? { ...h, status: 'Paid', date: 'Today' }
            : h
        ),
      });
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
      }, 1500);
    }, 1200);
  };

  const handleDownloadReceipt = (purpose) => {
    toast.success(`Downloading official fee receipt for ${purpose}...`);
  };

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
              <CreditCard className="w-4 h-4" />
              <span>Clear Dues (₹ {data.dueAmount.toLocaleString('en-IN')})</span>
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
                        className="px-3.5 py-1.5 bg-[#DC3545] hover:bg-[#c82837] text-white rounded-lg text-xs font-bold transition shadow-md shadow-[#DC3545]/20"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Online Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Campus Fee Payment Gateway</h3>
            <p className="text-xs text-gray-400 mb-4">
              Secure 256-bit encrypted student payment integration
            </p>

            <div className="p-4 rounded-xl bg-[#171d2b] border border-[#232a3b] mb-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Paying for:</span>
                <span className="font-semibold text-white">Semester Fee (Sem 6)</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2 pt-2 border-t border-[#232a3b]">
                <span className="text-gray-400">Total Payable:</span>
                <span className="text-xl font-black text-emerald-400">₹ 5,000</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-[#171d2b] border border-[#079BB5] cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="text-[#079BB5]" />
                <span className="text-sm font-semibold text-white">UPI / QR Code / NetBanking</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl bg-[#171d2b] border border-[#232a3b] cursor-pointer">
                <input type="radio" name="payment" className="text-[#079BB5]" />
                <span className="text-sm font-semibold text-white">Credit / Debit Card</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePayNow}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                {isProcessing ? 'Processing Transaction...' : 'Pay ₹ 5,000'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DueAmount;
