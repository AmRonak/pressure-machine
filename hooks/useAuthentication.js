import { setAuth } from "@/redux/slices/authSlice";
import { redirect, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

const { useLayoutEffect, useState } = require("react");

const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const pathname = usePathname();


  useLayoutEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    console.log(auth);
    if(pathname === '/' || pathname === '/login') {
      if(auth?.isAuthenticated){
        dispatch(setAuth());
        redirect("/dashboard")
      }
    } else {
      if(!auth?.isAuthenticated){
        redirect("/login")
      } else {
        dispatch(setAuth());
      }
    }
    setIsLoading(false)
  }, [dispatch, pathname])

  return isLoading;
};

export default useAuthentication;
