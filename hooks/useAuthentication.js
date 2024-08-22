import { JWT_TOKEN_NAME, SUPER_ADMIN } from "@/constants/constants";
import allMenu from "@/constants/menus";
import { toatsConfig } from "@/constants/toast";
import { resetAuth, setAuth, setCompanyName, setUserDetail } from "@/redux/slices/authSlice";
import handleAxiosRequest from "@/util/handleRequest";
import { jwtTokenValidate } from "@/util/isValidToken";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const { data } = await handleAxiosRequest({ api: 'parameterSetting/getCompanyname' });
        dispatch(setCompanyName(data.companyName))
      } catch (error) {
        // 
      }
    };
    fetchCompanyName();
  }, [dispatch])

  useEffect(() => {
    const token = window.localStorage.getItem(JWT_TOKEN_NAME);
    
    if(token) {
      if(!jwtTokenValidate(token)) {
        dispatch(resetAuth());
        router.push('/');
        return;
      }
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
          
          if(response.data?.user?.passwordExpired) {
            setIsLoading(false);
            router.push("/user-profile");
            return
          }
          if(response.data?.user?.tokenExpirationInfo) {
            toast.warn(response.data.user.tokenExpirationInfo, {...toatsConfig, id: 1});
          }
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
        .catch((error) => {
          console.log(error)
          router.push("/");
        })
    } else {
      if(pathname !== '/' && pathname !== '/login') {
        router.push("/");
      }
    }
    setIsLoading(false);
  }, [dispatch, pathname, router]);
  return isLoading;
};

export default useAuthentication;
