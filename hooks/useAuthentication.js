import { redirect, usePathname } from "next/navigation";

const { useLayoutEffect, useState } = require("react");

const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();


  useLayoutEffect(() => {
    const { isAuthenticated } = JSON.parse(localStorage.getItem('auth'));
    if(pathname === '/' || pathname === '/login') {
      if(isAuthenticated){
        redirect("/dashboard")
      }
    } else {
      if(!isAuthenticated){
        redirect("/login")
      }
    }
    setIsLoading(false)
  }, [pathname])

  return isLoading;
};

export default useAuthentication;
