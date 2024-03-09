import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NavBar from "./nav/NavBar";

export default function PrivateRoute({ children }) {
  const isLoggedIn = useAuth();
  const { pathname } = useLocation();
  return isLoggedIn ? (
    children
  ) : pathname === "/admin" ? (
    <Navigate to="/admin" />
  ) : (
    <Navigate to="/" />
  );
}
