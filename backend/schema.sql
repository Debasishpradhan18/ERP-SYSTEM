-- ========================================================
-- CAMPUS ERP – MYSQL WORKBENCH DATABASE SCHEMA & SEED
-- ========================================================

CREATE DATABASE IF NOT EXISTS `campus_erp`;
USE `campus_erp`;

-- 1. Users Table
DROP TABLE IF EXISTS `complaints`;
DROP TABLE IF EXISTS `fees`;
DROP TABLE IF EXISTS `results`;
DROP TABLE IF EXISTS `attendance`;
DROP TABLE IF EXISTS `timetable`;
DROP TABLE IF EXISTS `notices`;
DROP TABLE IF EXISTS `students`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('student', 'faculty', 'admin') DEFAULT 'student',
  `avatar` TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  `phoneNumber` VARCHAR(20) DEFAULT '',
  `isActive` TINYINT(1) DEFAULT 1,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Students Table
CREATE TABLE `students` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT UNIQUE NOT NULL,
  `rollNumber` VARCHAR(50) UNIQUE NOT NULL,
  `registrationNumber` VARCHAR(50) UNIQUE NOT NULL,
  `course` VARCHAR(50) DEFAULT 'B.Tech',
  `department` VARCHAR(100) DEFAULT 'Computer Science & Engineering',
  `currentSemester` INT DEFAULT 6,
  `batch` VARCHAR(50) DEFAULT 'Final Year',
  `sgpa` DECIMAL(4,2) DEFAULT 8.42,
  `cgpa` DECIMAL(4,2) DEFAULT 8.31,
  `proctorName` VARCHAR(100) DEFAULT 'Dr. Anand Sharma',
  `proctorEmail` VARCHAR(100) DEFAULT 'anand.sharma@campuserp.edu',
  `proctorPhone` VARCHAR(20) DEFAULT '+91 98765 43210',
  `proctorDepartment` VARCHAR(100) DEFAULT 'Computer Science & Engineering',
  `proctorCabin` VARCHAR(50) DEFAULT 'Block B - 302',
  `totalFee` DECIMAL(10,2) DEFAULT 60000.00,
  `paidFee` DECIMAL(10,2) DEFAULT 55000.00,
  `dueFee` DECIMAL(10,2) DEFAULT 5000.00,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- 3. Attendance Table
CREATE TABLE `attendance` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `studentId` INT NOT NULL,
  `subject` VARCHAR(100) NOT NULL,
  `subjectCode` VARCHAR(20) DEFAULT '',
  `type` ENUM('Theory', 'Lab') DEFAULT 'Theory',
  `totalClasses` INT DEFAULT 0,
  `presentClasses` INT DEFAULT 0,
  `absentClasses` INT DEFAULT 0,
  `percentage` DECIMAL(5,2) DEFAULT 0.00,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE
);

-- 4. Class Timetable Table
CREATE TABLE `timetable` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `day` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
  `periodNumber` INT NOT NULL,
  `subject` VARCHAR(100) NOT NULL,
  `faculty` VARCHAR(100) NOT NULL,
  `room` VARCHAR(50) NOT NULL,
  `startTime` VARCHAR(20) NOT NULL,
  `endTime` VARCHAR(20) NOT NULL,
  `type` ENUM('Theory', 'Lab') DEFAULT 'Theory',
  `semester` INT DEFAULT 6,
  `department` VARCHAR(100) DEFAULT 'Computer Science & Engineering',
  `isCancelled` TINYINT(1) DEFAULT 0,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Results Table
CREATE TABLE `results` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `studentId` INT NOT NULL,
  `semester` INT DEFAULT 6,
  `subject` VARCHAR(100) NOT NULL,
  `maxMarks` INT DEFAULT 100,
  `marksObtained` INT NOT NULL,
  `grade` VARCHAR(10) NOT NULL,
  `internalMarks` INT DEFAULT 28,
  `externalMarks` INT DEFAULT 58,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE
);

-- 6. Fees Table
CREATE TABLE `fees` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `studentId` INT NOT NULL,
  `purpose` VARCHAR(100) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `date` VARCHAR(50) DEFAULT '',
  `status` ENUM('Paid', 'Due', 'Pending') DEFAULT 'Paid',
  `receiptUrl` VARCHAR(255) DEFAULT '',
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE
);

-- 7. Complaints Table
CREATE TABLE `complaints` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ticketId` VARCHAR(50) UNIQUE NOT NULL,
  `studentId` INT NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  `priority` ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  `status` ENUM('Submitted', 'Under Review', 'In Progress', 'Resolved', 'Rejected') DEFAULT 'Under Review',
  `attachment` VARCHAR(255) DEFAULT '',
  `adminResponse` TEXT,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE
);

-- 8. Notices Table
CREATE TABLE `notices` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `category` ENUM('Academic', 'Examination', 'Fees', 'Events', 'General') DEFAULT 'Academic',
  `content` TEXT NOT NULL,
  `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `postedBy` VARCHAR(100) DEFAULT 'Academic Office',
  `isImportant` TINYINT(1) DEFAULT 0,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================================================
-- SEED DATA MATCHING REFERENCE SCREENSHOTS
-- ========================================================

-- Insert Users (Password: password123 hashed via bcrypt)
-- Using precomputed bcrypt for 'password123': $2a$10$w4.z3aZ/jDcrP248V9g2Z.mBw68v7xV9.w8B.E.fM.uE3FfM7k3tW
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `avatar`, `phoneNumber`) VALUES
(1, 'Debasish Pradhan', 'student@campus.edu', '$2a$10$w4.z3aZ/jDcrP248V9g2Z.mBw68v7xV9.w8B.E.fM.uE3FfM7k3tW', 'student', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', '+91 91234 56789'),
(2, 'Prof. S. Das', 'faculty@campus.edu', '$2a$10$w4.z3aZ/jDcrP248V9g2Z.mBw68v7xV9.w8B.E.fM.uE3FfM7k3tW', 'faculty', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80', '+91 98765 43210'),
(3, 'Chief Administrator', 'admin@campus.edu', '$2a$10$w4.z3aZ/jDcrP248V9g2Z.mBw68v7xV9.w8B.E.fM.uE3FfM7k3tW', 'admin', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80', '+91 90000 11111');

-- Insert Student Profile
INSERT INTO `students` (`id`, `userId`, `rollNumber`, `registrationNumber`, `course`, `department`, `currentSemester`, `batch`, `sgpa`, `cgpa`, `proctorName`, `proctorEmail`, `proctorPhone`, `proctorCabin`, `totalFee`, `paidFee`, `dueFee`) VALUES
(1, 1, '22CSE088', 'REG-2022-CSE-088', 'B.Tech', 'Computer Science & Engineering', 6, 'Final Year', 8.42, 8.31, 'Dr. Anand Sharma', 'anand.sharma@campuserp.edu', '+91 98765 43210', 'Block B - 302', 60000.00, 55000.00, 5000.00);

-- Insert Attendance Records
INSERT INTO `attendance` (`studentId`, `subject`, `type`, `totalClasses`, `presentClasses`, `absentClasses`, `percentage`) VALUES
(1, 'DBMS', 'Theory', 30, 26, 4, 86.67),
(1, 'Operating System', 'Theory', 30, 24, 6, 80.00),
(1, 'Computer Networks', 'Theory', 30, 22, 8, 73.33),
(1, 'Web Technology', 'Lab', 15, 12, 3, 80.00),
(1, 'DBMS Lab', 'Lab', 15, 14, 1, 93.33);

-- Insert Timetable
INSERT INTO `timetable` (`day`, `periodNumber`, `subject`, `faculty`, `room`, `startTime`, `endTime`, `type`, `semester`) VALUES
('Monday', 1, 'DBMS', 'Prof. S. Das', 'Room 204', '09:00 AM', '10:00 AM', 'Theory', 6),
('Monday', 2, 'Java', 'Prof. R. Mishra', 'Room 205', '10:00 AM', '11:00 AM', 'Theory', 6),
('Monday', 3, 'Operating System', 'Prof. P. Sahoo', 'Room 301', '11:30 AM', '12:30 PM', 'Theory', 6),
('Monday', 4, 'CN Lab', 'Prof. A. Nayak', 'Lab 2', '02:00 PM', '04:00 PM', 'Lab', 6),
('Tuesday', 1, 'Computer Networks', 'Prof. A. Nayak', 'Room 204', '09:00 AM', '10:00 AM', 'Theory', 6),
('Tuesday', 2, 'DBMS', 'Prof. S. Das', 'Room 204', '10:00 AM', '11:00 AM', 'Theory', 6),
('Tuesday', 3, 'Web Technology', 'Prof. K. Verma', 'Room 302', '11:30 AM', '12:30 PM', 'Theory', 6),
('Tuesday', 4, 'DBMS Lab', 'Prof. S. Das', 'Lab 1', '02:00 PM', '04:00 PM', 'Lab', 6);

-- Insert Semester Results
INSERT INTO `results` (`studentId`, `semester`, `subject`, `maxMarks`, `marksObtained`, `grade`) VALUES
(1, 6, 'DBMS', 100, 86, 'A'),
(1, 6, 'Operating System', 100, 80, 'A-'),
(1, 6, 'Computer Networks', 100, 78, 'B+'),
(1, 6, 'Web Technology', 100, 88, 'A'),
(1, 6, 'Software Engineering', 100, 82, 'A-');

-- Insert Fee Ledger
INSERT INTO `fees` (`studentId`, `purpose`, `amount`, `date`, `status`) VALUES
(1, 'Semester Fee (Sem 5)', 30000.00, '10 Jan 2025', 'Paid'),
(1, 'Hostel Fee', 25000.00, '15 Jan 2025', 'Paid'),
(1, 'Semester Fee (Sem 6)', 5000.00, '-', 'Due');

-- Insert Complaints
INSERT INTO `complaints` (`ticketId`, `studentId`, `category`, `title`, `description`, `priority`, `status`, `adminResponse`) VALUES
('#CMP1604', 1, 'Attendance Issue', 'Attendance not updated', 'My last two classes were marked absent, but I was present in the class. Please check and update my attendance.', 'Medium', 'Under Review', NULL),
('#CMP1307', 1, 'Timetable Issue', 'Class room change request', 'Room 204 projector was not functional during DBMS class.', 'Low', 'Resolved', 'Projector has been serviced by IT staff.'),
('#CMP0983', 1, 'Fee Issue', 'Fee payment receipt not downloaded', 'Semester 5 receipt was missing the official stamp.', 'High', 'Resolved', 'Signed receipt updated and available in Due Amount section.');
