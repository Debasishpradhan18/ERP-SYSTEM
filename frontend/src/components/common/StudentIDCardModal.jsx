import React, { useState } from 'react';
import { GraduationCap, QrCode, Download, Printer, ShieldCheck, X, Sparkles, RotateCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockStudentData } from '../../services/api';
import toast from 'react-hot-toast';

const StudentIDCardModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const student = mockStudentData.student;
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success('Downloading Digital Student ID Card...');
  };

  const studentAvatar = user?.avatar || student.avatar;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Controls Bar */}
        <div className="w-full flex items-center justify-between pb-3 text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#079BB5]" />
            <span className="text-sm font-bold">Official Virtual ID Card</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The ID Card Container with 3D Flip Effect */}
        <div
          className="w-full bg-gradient-to-br from-[#121622] via-[#1a2130] to-[#0c0f17] border-2 border-[#079BB5]/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center cursor-pointer select-none"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Subtle Watermark Seal */}
          <div className="absolute right-[-20px] top-[-20px] opacity-5 pointer-events-none">
            <GraduationCap className="w-64 h-64 text-white" />
          </div>

          {!isFlipped ? (
            /* FRONT SIDE OF ID CARD */
            <div className="space-y-4">
              {/* Header */}
              <div className="border-b border-[#232a3b] pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-left">
                  <div className="p-1.5 bg-[#079BB5] rounded-lg text-white">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white tracking-wider uppercase">CAMPUS ERP</h3>
                    <p className="text-[9px] text-[#079BB5] uppercase font-bold tracking-widest">University Identity Card</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-[#16A34A]/20 text-[#16A34A] px-2 py-0.5 rounded-full border border-[#16A34A]/30 font-bold">
                  VALID
                </span>
              </div>

              {/* Student Photo */}
              <div className="relative inline-block mx-auto">
                <img
                  src={studentAvatar}
                  alt={user?.name || student.name}
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[#079BB5]/60 shadow-xl mx-auto"
                />
                <span className="absolute bottom-0 right-0 p-1.5 bg-emerald-500 rounded-full ring-2 ring-[#121622]" />
              </div>

              {/* Student Name & Roll Number */}
              <div>
                <h2 className="text-lg font-black text-white tracking-tight">{user?.name || student.name}</h2>
                <p className="text-xs font-mono font-bold text-[#079BB5] mt-0.5">
                  Roll No: {student.rollNumber}
                </p>
                <p className="text-xs text-gray-300 font-medium mt-0.5">B.Tech - Computer Science & Engineering</p>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 gap-2 text-left bg-[#171d2b]/80 p-3 rounded-xl border border-[#232a3b] text-[11px]">
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-semibold">Valid Thru</span>
                  <span className="font-bold text-white">June 2026</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-semibold">Blood Group</span>
                  <span className="font-bold text-red-400">O+ (Positive)</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-semibold">Reg. No</span>
                  <span className="font-bold text-white">REG-2022-CSE-088</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-semibold">Emergency</span>
                  <span className="font-bold text-emerald-400">+91 91234 56789</span>
                </div>
              </div>

              {/* Barcode & Security Chip */}
              <div className="pt-2 flex items-center justify-between">
                <div className="text-left font-mono tracking-widest text-xs text-gray-400">
                  |||||| |||| |||||||| |||||
                </div>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <RotateCw className="w-3 h-3 text-[#079BB5]" /> Tap to Flip
                </span>
              </div>
            </div>
          ) : (
            /* BACK SIDE OF ID CARD */
            <div className="space-y-4 py-2">
              <div className="border-b border-[#232a3b] pb-2 text-left">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Campus Regulations</h4>
                <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                  1. This digital pass must be presented upon request by campus security or library officials.
                  <br />
                  2. Non-transferable and strictly intended for university academic use.
                </p>
              </div>

              <div className="p-3 bg-[#171d2b] rounded-xl border border-[#232a3b] text-left text-xs space-y-1">
                <p className="text-[10px] text-gray-400 uppercase font-semibold">Campus Address</p>
                <p className="text-white font-medium">Main University Campus, Engineering Enclave</p>
                <p className="text-gray-400 text-[11px]">Email: info@campuserp.edu | Phone: +91 674 2300000</p>
              </div>

              <div className="pt-3 border-t border-[#232a3b] flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[10px] font-mono text-[#079BB5] font-bold">DIGITALLY AUTHORIZED</p>
                  <p className="text-[9px] text-gray-400">Registrar & Dean Office</p>
                </div>
                <div className="p-2 bg-white rounded-lg">
                  <QrCode className="w-10 h-10 text-black" />
                </div>
              </div>

              <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1 pt-2">
                <RotateCw className="w-3 h-3 text-[#079BB5]" /> Tap to view front
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons Below Card */}
        <div className="mt-4 flex items-center gap-3 w-full">
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 bg-[#079BB5] hover:bg-[#06849a] text-white rounded-xl text-xs font-bold transition shadow-lg shadow-[#079BB5]/25 flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Card</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-[#171d2b] hover:bg-[#232a3b] text-gray-300 border border-[#232a3b] rounded-xl text-xs font-semibold transition flex items-center gap-2"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentIDCardModal;
