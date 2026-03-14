import "dotenv/config";
import express from "express";
import videoRoutes from "./controllers/index.js";
import teacherRoutes from "./controllers/teacher/index.js"
import studentRoutes from "./controllers/student/index.js"
import loginRoutes from './controllers/login/index.js'
import courseRoutes from './controllers/course/index.js'
import chapterRoutes from './controllers/chapter/index.js'
import authRoutes from './controllers/auth/index.js'
import newAuthRoutes from './controllers/newAuth.js'
import newStudentRoutes from './controllers/newStudent.js'
import facultyRoutes from './controllers/faculty.js'
import analyticsRoutes from './controllers/analytics.js'
import cors from 'cors';

import './dbConnect.js'


// Express App
const app = express();
const port = process.env.PORT || 5010;

app.use(cors());

// app.use(cors({
//   origin: 'https://lms-world.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));


app.use(express.json());

// Routes
app.use("/api/videos", videoRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/auth", newAuthRoutes); // Override old auth routes with new one
app.use("/api/students", newStudentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/analytics", analyticsRoutes);



app.listen(port, () => {
  console.log("Server started listening on port", port);
});

