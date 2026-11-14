# Campus ERP – College Student Management System

A production-quality, responsive **College Student ERP System** built using the **MERN Stack** (MongoDB, Express, React with Vite, Node.js, and Tailwind CSS).

The design matches the dark modern theme reference layout with custom colorful module cards, circular attendance progress gauges, class timetables, examination marksheets, online fee payment simulation, and a full grievance ticket management system.

---

## 🎨 Design & Palette Reference

* **Background**: Pure Deep Dark (`#000000` / `#08090C`)
* **Card Panels**: Charcoal Dark (`#121622` / `#171D2B`)
* **Module Card 1 (Attendance)**: Cyan / Teal (`#079BB5`)
* **Module Card 2 (Examination)**: Emerald Green (`#16A34A`)
* **Module Card 3 (Proctor)**: Slate Blue (`#475569`)
* **Module Card 4 (Due Amount)**: Vibrant Crimson (`#DC3545`)
* **Module Card 5 (Timetable)**: Royal Purple (`#7C3AED`)
* **Module Card 6 (Raise a Problem)**: Deep Amber (`#EA8000`)
* **Active Sidebar Pill**: Cyan Highlight (`#079BB5`)

---

## 🚀 Quick Start Guide

### 1. One-Click Launch (Windows)
Double-click **`start-dev.bat`** in the project root directory. It will open two separate command windows:
* **Backend API**: [http://localhost:5000](http://localhost:5000)
* **Frontend Application**: [http://localhost:5173](http://localhost:5173)

### 2. Manual Terminal Launch

#### Start Backend:
```bash
cd backend
npm run dev
```

#### Start Frontend:
```bash
cd frontend
npm run dev
```

#### Seed Database (Optional):
```bash
cd backend
npm run seed
```

---

## 🔐 Demo Credentials

All portals come with pre-configured instant demo logins:

| Role | Email | Password | Primary Features |
| :--- | :--- | :--- | :--- |
| **Student** | `student@campus.edu` | `password123` | Attendance gauges, Timetable, CGPA/SGPA, Fee history, Complaints |
| **Faculty** | `faculty@campus.edu` | `password123` | Mark attendance, course management, syllabus tracking |
| **Admin** | `admin@campus.edu` | `password123` | Campus analytics, department stats, grievance resolution |

---

## 📱 Modules & Features

### 1. Role Selection & Authentication
* Split-screen university visual hero on left, 3 role selection buttons on right (Student, Faculty, Admin).
* JWT authentication with bcrypt password hashing and session persistence.

### 2. Student Dashboard
* Personal greeting: *"Welcome, Debasish 👋 (B.Tech - Computer Science & Engineering)"*.
* **6 Colorful Dashboard Module Cards**:
  1. Attendance (Cyan)
  2. Examination (Green)
  3. Proctor (Slate)
  4. Due Amount (Red)
  5. Timetable (Purple)
  6. Raise a Problem (Orange)
* **Attendance Overview**: 3 Circular SVG Progress Gauges for **Theory (85%)**, **Lab (78%)**, and **Total (82%)**.
* **Today's Timetable**: Live schedule widget with room numbers (Room 204, Room 205, Room 301, etc.).

### 3. Attendance Details
* 4 Top Summary Metric Cards: **Total Classes (120)**, **Present (98)**, **Absent (22)**, **Percentage (81.67%)**.
* Subject breakdown table (DBMS, OS, Computer Networks, Web Tech, DBMS Lab) with type (Theory/Lab) and color-coded status badges.
* Interactive **Attendance Correction Request** modal.

### 4. Examination & Results
* Three-way navigation tabs: **Exam Schedule**, **Internal Marks**, and **Results**.
* Subject score table with maximum marks, marks obtained, and letter grades (A, A-, B+).
* Honors badge displaying **SGPA (8.42)** and **CGPA (8.31)** with animated **Download Marksheet** button.

### 5. Class Timetable
* **Today's Timetable** view with time slots, assigned professors, and room numbers.
* **Weekly Timetable** tab with Monday through Friday tab switcher.

### 6. Due Amount & Fees
* Stat Cards: **Total Fee (₹ 60,000)**, **Paid Amount (₹ 55,000)**, **Due Amount (₹ 5,000)**.
* Detailed transaction history table with downloadable fee receipts.
* Interactive **Pay Now** modal with UPI, Cards, and NetBanking simulation.

### 7. Raise a Problem (Grievance System)
* Form with Category selector (Attendance, Fees, Timetable, Faculty, Hostel, etc.), title, description, file upload, and priority.
* Real-time Ticket ID generation (e.g. `#CMP1604`, `#CMP1307`, `#CMP0983`).
* Expandable status tracker with admin responses.

### 8. Faculty & Admin Dashboards
* **Admin Overview**: Institutional stats (1,248 Students, 86 Faculty, 6 Departments, 14 Open Complaints).
* Recharts Donut Chart for campus-wide attendance (82% Present / 18% Absent).
* Recharts Bar Chart for complaint resolution pipeline (Pending, In Progress, Resolved, Rejected).
* **Faculty Dashboard**: Live attendance recording sheet with 1-click status toggling.

---

## 🛠️ Technology Stack

* **Frontend**: React 18, Vite, Tailwind CSS, React Router DOM v6, Lucide React, Recharts, React Hot Toast, Canvas Confetti.
* **Backend**: Node.js, Express.js (ES Modules), Mongoose, JWT, bcryptjs, Multer.
* **Database**: MongoDB (Local or Atlas cloud ready).
