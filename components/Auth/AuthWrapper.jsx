'use client';

import useAuthentication from "@/hooks/useAuthentication";
import Loading from "../Loading";

const AuthWrapper = ({children}) => {
  const isLoading = useAuthentication();
  
  if(isLoading) {
    return (
      <Loading />
    );
  }

  return <div className="relative">{children}</div>;
};

export default AuthWrapper;
