import React, { useState, useRef } from 'react';
import {
  User,
  Phone,
  Mail,
  Building,
  MapPin,
  Award,
  BookOpen,
  Calendar,
  ShieldCheck,
  Camera,
  Upload,
  Check,
  X,
  Sparkles,
  CreditCard,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockStudentData } from '../../services/api';
import StudentIDCardModal from '../../components/common/StudentIDCardModal';
import toast from 'react-hot-toast';

const StudentProfile = () => {
  const { user, setUser } = useAuth();
  const student = mockStudentData.student;
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showIdCardModal, setShowIdCardModal] = useState(false);

  // Preset avatar choices for quick 1-click selection
  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=250&q=80',
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file (PNG, JPG, or WEBP)');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePicture = async () => {
    if (!previewImage && !selectedFile) return;
    setIsUploading(true);

    try {
      let finalAvatarUrl = previewImage;

      // 1. Try uploading the file to the backend
      if (selectedFile) {
        const formData = new FormData();
        formData.append('avatar', selectedFile);

        try {
          const res = await api.post('/auth/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          if (res.data?.success && res.data?.avatar) {
            finalAvatarUrl = res.data.avatar;
          }
        } catch (apiErr) {
          console.warn('Multer upload fallback, trying JSON payload:', apiErr.message);
          try {
            const resJson = await api.post('/auth/avatar', { avatar: previewImage });
            if (resJson.data?.success && resJson.data?.avatar) {
              finalAvatarUrl = resJson.data.avatar;
            }
          } catch (jsonErr) {}
        }
      } else if (previewImage) {
        try {
          const resJson = await api.post('/auth/avatar', { avatar: previewImage });
          if (resJson.data?.success && resJson.data?.avatar) {
            finalAvatarUrl = resJson.data.avatar;
          }
        } catch (jsonErr) {}
      }

      // 2. Update React Auth Context
      const updatedUser = { ...user, avatar: finalAvatarUrl };
      setUser(updatedUser);

      // 3. Update active session in localStorage
      localStorage.setItem('campus_erp_user', JSON.stringify(updatedUser));

      // 4. Save to persistent permanent storage (survives logout & re-login tomorrow)
      const userKey = user?.email || user?.rollNumber || user?.id || 'student';
      localStorage.setItem(`campus_erp_avatar_${userKey}`, finalAvatarUrl);
      localStorage.setItem('campus_erp_saved_avatar', finalAvatarUrl);

      toast.success('Profile picture saved permanently!');
      setPreviewImage(null);
      setSelectedFile(null);
    } catch (err) {
      toast.error('Failed to update picture');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectPreset = async (url) => {
    const updatedUser = { ...user, avatar: url };
    setUser(updatedUser);
    localStorage.setItem('campus_erp_user', JSON.stringify(updatedUser));
    const userKey = user?.email || user?.rollNumber || user?.id || 'student';
    localStorage.setItem(`campus_erp_avatar_${userKey}`, url);
    localStorage.setItem('campus_erp_saved_avatar', url);
    setPreviewImage(null);
    setSelectedFile(null);

    try {
      await api.post('/auth/avatar', { avatar: url });
    } catch (e) {
      console.warn('Preset save note:', e.message);
    }

    toast.success('Profile avatar updated!');
  };

  const currentAvatar =
    previewImage ||
    user?.avatar ||
    localStorage.getItem('campus_erp_saved_avatar') ||
    student.avatar;

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Student Profile</h1>
          <p className="text-sm text-gray-400 mt-1">Official University Enrollment & Proctor Details</p>
        </div>

        <button
          onClick={() => setShowIdCardModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-[#079BB5] to-[#16A34A] hover:brightness-110 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-[#079BB5]/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <CreditCard className="w-4 h-4" />
          <span>View Digital ID Card 🪪</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card with Photo Uploader */}
        <div className="bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl flex flex-col items-center text-center">
          {/* Avatar with Camera Overlay */}
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
            <img
              src={currentAvatar}
              alt={user?.name || student.name}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-[#079BB5]/50 shadow-2xl transition duration-300 group-hover:brightness-75"
            />
            
            {/* Camera Hover Overlay */}
            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200">
              <Camera className="w-7 h-7 text-[#079BB5]" />
              <span className="text-[11px] font-semibold mt-1">Change Photo</span>
            </div>

            {/* Active Status Dot */}
            <span className="absolute bottom-1 right-2 p-2 bg-[#16A34A] rounded-full ring-4 ring-[#121622]" />

            {/* Hidden Native File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Action buttons if image is being previewed */}
          {previewImage && (
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={handleSavePicture}
                disabled={isUploading}
                className="px-3.5 py-1.5 bg-[#16A34A] hover:bg-[#138a3e] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md shadow-[#16A34A]/20 transition"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Photo</span>
              </button>
              <button
                onClick={() => {
                  setPreviewImage(null);
                  setSelectedFile(null);
                }}
                className="px-3 py-1.5 bg-[#1f2737] hover:bg-[#283246] text-gray-300 text-xs font-medium rounded-lg flex items-center gap-1 transition"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            </div>
          )}

          {/* Preset Avatar Selection */}
          <div className="w-full mt-4 pt-4 border-t border-[#232a3b]">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Or Choose Preset Avatar
            </p>
            <div className="flex justify-center gap-2">
              {avatarPresets.map((presetUrl, idx) => (
                <img
                  key={idx}
                  src={presetUrl}
                  alt={`Preset ${idx + 1}`}
                  onClick={() => handleSelectPreset(presetUrl)}
                  className={`w-9 h-9 rounded-full object-cover cursor-pointer border-2 transition hover:scale-110 ${
                    user?.avatar === presetUrl ? 'border-[#079BB5] ring-2 ring-[#079BB5]/40' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mt-5">{user?.name || student.name}</h2>
          <p className="text-xs text-[#079BB5] font-semibold mt-0.5">{student.batch}</p>
          <p className="text-xs text-gray-400">{student.department}</p>

          <div className="w-full mt-6 pt-6 border-t border-[#232a3b] space-y-3 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400 text-xs">Roll Number:</span>
              <span className="font-semibold text-white text-xs">{student.rollNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-xs">Registration No:</span>
              <span className="font-semibold text-white text-xs">REG-2022-CSE-088</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-xs">Current Semester:</span>
              <span className="font-semibold text-white text-xs">Semester 6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-xs">Academic Status:</span>
              <span className="font-semibold text-emerald-400 text-xs">Active Regular</span>
            </div>
          </div>
        </div>

        {/* Proctor Details Card matching reference Card 3 */}
        <div className="lg:col-span-2 bg-[#121622] border border-[#232a3b] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#232a3b]">
            <div className="p-3 bg-[#475569] rounded-xl text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Assigned Faculty Proctor</h3>
              <p className="text-xs text-gray-400">Mentor for academic progress and university guidance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#171d2b] border border-[#232a3b] space-y-1">
              <p className="text-xs text-gray-400 font-semibold uppercase">Proctor Name</p>
              <p className="text-base font-bold text-white">{student.proctor.name}</p>
              <p className="text-xs text-[#079BB5]">Senior Faculty Mentor</p>
            </div>

            <div className="p-4 rounded-xl bg-[#171d2b] border border-[#232a3b] space-y-1">
              <p className="text-xs text-gray-400 font-semibold uppercase">Department</p>
              <p className="text-base font-bold text-white">{student.proctor.department}</p>
              <p className="text-xs text-gray-400">School of Engineering</p>
            </div>

            <div className="p-4 rounded-xl bg-[#171d2b] border border-[#232a3b] space-y-1">
              <p className="text-xs text-gray-400 font-semibold uppercase">Contact Phone</p>
              <p className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <Phone className="w-4 h-4" /> {student.proctor.phone}
              </p>
              <p className="text-xs text-gray-400">Office hours: 10 AM - 4 PM</p>
            </div>

            <div className="p-4 rounded-xl bg-[#171d2b] border border-[#232a3b] space-y-1">
              <p className="text-xs text-gray-400 font-semibold uppercase">Official Email</p>
              <p className="text-base font-bold text-[#079BB5] flex items-center gap-2">
                <Mail className="w-4 h-4" /> {student.proctor.email}
              </p>
              <p className="text-xs text-gray-400">{student.proctor.cabin}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#171d2b]/60 border border-[#232a3b] text-xs text-gray-300 leading-relaxed">
            <strong className="text-white">Note:</strong> Proctor meetings are scheduled bi-weekly. For urgent academic attendance or fee clearance, visit Block B - Room 302 or message your proctor directly through the ERP messaging window.
          </div>
        </div>
      </div>

      {/* Render the Virtual ID Card Modal */}
      <StudentIDCardModal
        isOpen={showIdCardModal}
        onClose={() => setShowIdCardModal(false)}
      />
    </div>
  );
};

export default StudentProfile;
