import { JWT_TOKEN_NAME } from "@/constants/constants";
import { setAuth, setUserDetail } from "@/redux/slices/authSlice";
import axios from "axios";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const isUser = useSelector(state => state.auth);
  
  useEffect(() => {
    const token = window.localStorage.getItem(JWT_TOKEN_NAME);
    if(token) {
      let config = {
        method: 'get',
        url: 'http://localhost:5000/api/users/profile',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      axios.request(config)
      .then((response) => {
        dispatch(setUserDetail(response.data.user))
        dispatch(setAuth(token));
        if(pathname === '/' || pathname === '/login') {
          router.push("/dashboard")
        }
        setIsLoading(false);
      })
      .catch(() => {
        router.push("/login");
        setIsLoading(false);
      })
    }
    setIsLoading(false);
  }, [dispatch, pathname, router]);
  return isLoading;
};

export default useAuthentication;
