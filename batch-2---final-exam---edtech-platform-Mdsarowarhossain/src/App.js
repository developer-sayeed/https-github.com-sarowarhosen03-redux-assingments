import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

import StudentLogin from "./pages/student/StudentLogin";
import StudentRegistration from "./pages/student/StudentRegistration";
import CoursePlayer from "./pages/student/CoursePlayer";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivateRoute from "./components/PrivatRoute";
import PublicRoute from "./components/PublicRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import Quiz from "./pages/student/Quiz";
import LeaderBoard from "./pages/student/LeaderBoard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVideos from "./pages/admin/AdminVideos";
import AdminAssignment from "./pages/admin/AdminAssignment";
import AdminQuizzes from "./pages/admin/AdminQuizzes";
import AdminAssignmentMark from "./pages/admin/AdminAssignmentMark";
import NavBar from "./components/nav/NavBar";
import NotFound from "./pages/NotFound";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div className="w-screen h-screen  flex justify-center items-center">
      <h2 className="font-bold lg:text-2xl">Chekeing Authuntication...</h2>
    </div>
  ) : (
    <Router>
      <NavBar />

      {/* Student Routes */}
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route
            index
            element={
              <PublicRoute>
                <StudentLogin />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <StudentRegistration />
              </PublicRoute>
            }
          />
   
          <Route
            path="course/:id?"
            element={
              <PrivateRoute>
                <CoursePlayer />
              </PrivateRoute>
            }
          />

          <Route
            path="quiz"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />

          <Route
            path="Leaderboard"
            element={
              <PrivateRoute>
                <LeaderBoard />
              </PrivateRoute>
            }
          />
        </Route>
        {/* admin routes */}
        <Route path="/admin" element={<Outlet />}>
          <Route
            index
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="videos"
            element={
              <PrivateRoute>
                <AdminVideos />
              </PrivateRoute>
            }
          />
          <Route
            path="assignments"
            element={
              <PrivateRoute>
                <AdminAssignment />
              </PrivateRoute>
            }
          />
          <Route
            path="quizzes"
            element={
              <PrivateRoute>
                <AdminQuizzes />
              </PrivateRoute>
            }
          />

          <Route
            path="assignment-mark"
            element={
              <PrivateRoute>
                <AdminAssignmentMark />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
