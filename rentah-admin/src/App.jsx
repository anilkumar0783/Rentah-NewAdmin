import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./Components/layout/adminLayout";
import { useSelector } from "react-redux";
import "./index.css";

const Login = lazy(() => import("./Pages/Login"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Users = lazy(() => import("./Pages/Users"));
const Listings = lazy(() => import("./Pages/Listings"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token"); 
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      {/* <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}> */}
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="listings" element={<Listings />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>

    </Router>
  );
}

export default App;
