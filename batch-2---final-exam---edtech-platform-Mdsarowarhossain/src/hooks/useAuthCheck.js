import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminLoggedIn, userLoggedIn } from "../features/auth/authSlice";
import { getCookie } from "../utils/cookieUtils";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const userAuth = getCookie("userAuth");
    const adminAuth = getCookie("adminAuth");

    if (userAuth) {
      const auth = JSON.parse(userAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }
    if (adminAuth) {
      const auth = JSON.parse(adminAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          adminLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
