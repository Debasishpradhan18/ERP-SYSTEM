import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import DirectLogin from './pages/auth/DirectLogin';
import RoleSelection from './pages/auth/RoleSelection';
import StudentLogin from './pages/auth/StudentLogin';
import FacultyLogin from './pages/auth/FacultyLogin';
import AdminLogin from './pages/auth/AdminLogin';

import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import AttendanceDetails from './pages/student/AttendanceDetails';
import ExaminationResults from './pages/student/ExaminationResults';
import ClassTimetable from './pages/student/ClassTimetable';
import DueAmount from './pages/student/DueAmount';
import RaiseProblem from './pages/student/RaiseProblem';
import StudentProfile from './pages/student/StudentProfile';
import Assignments from './pages/student/Assignments';
import NoticeBoard from './pages/common/NoticeBoard';
import AdminDashboard from './pages/admin/AdminDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#141923',
            color: '#fff',
            border: '1px solid #232a3b',
            borderRadius: '12px',
          },
        }}
      />
      <Routes>
        {/* Direct College Portal Login with Username, Password & Captcha */}
        <Route path="/" element={<DirectLogin />} />
        <Route path="/roles" element={<RoleSelection />} />
        <Route path="/login/student" element={<DirectLogin />} />
        <Route path="/login/faculty" element={<DirectLogin />} />
        <Route path="/login/admin" element={<DirectLogin />} />

        {/* Student Portal Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="attendance" element={<AttendanceDetails />} />
          <Route path="examination" element={<ExaminationResults />} />
          <Route path="timetable" element={<ClassTimetable />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="fees" element={<DueAmount />} />
          <Route path="complaints" element={<RaiseProblem />} />
          <Route path="notices" element={<NoticeBoard />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>

        {/* Faculty Portal Routes */}
        <Route path="/faculty" element={<StudentLayout />}>
          <Route index element={<Navigate to="/faculty/dashboard" replace />} />
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="notices" element={<NoticeBoard />} />
        </Route>

        {/* Admin Portal Routes */}
        <Route path="/admin" element={<StudentLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<AdminDashboard />} />
          <Route path="complaints" element={<RaiseProblem />} />
          <Route path="notices" element={<NoticeBoard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
