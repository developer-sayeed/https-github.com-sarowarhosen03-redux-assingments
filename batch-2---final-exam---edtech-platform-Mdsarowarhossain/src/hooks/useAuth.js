import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectUserInfo } from "../features/student/studentSelectors";

export default function useAuth() {
  const { pathname } = useLocation();
  const isAdmin = pathname.includes("admin");

  //get the current user from the redux store based on the access path (admin or student)
  const auth = useSelector((state) => {
    return selectUserInfo(state, isAdmin);
  });

  if (auth?.accessToken && auth?.user) {
    if (
      (isAdmin && auth.user?.role === "admin") ||
      (!isAdmin && auth.user?.role === "student")
    ) {
      return true;
    }

    return false;
  } else {
    return false;
  }
}
