import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();

  const { pathname } = useLocation();
  return !isLoggedIn ? (
    children
  ) : pathname === "/admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/course" />
  );
}
