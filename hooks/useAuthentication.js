import { JWT_TOKEN_NAME, SUPER_ADMIN } from "@/constants/constants";
import allMenu from "@/constants/menus";
import { setAuth, setUserDetail } from "@/redux/slices/authSlice";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  
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
          router.push("/dashboard");
        } else {
          if(pathname !== '/dashboard' && response.data.user.userLevel !== SUPER_ADMIN) {
            const permissions = response.data.user.permissions;
            const menu = allMenu.find(({urlPath}) => pathname.includes((urlPath)))
            if(!permissions.includes(menu.id))
            router.push("/dashboard");
            setIsLoading(false);
          }
        }
      })
      .catch(() => {
        router.push("/");
      })
    }
    setIsLoading(false);
  }, [dispatch, pathname, router]);
  return isLoading;
};

export default useAuthentication;
