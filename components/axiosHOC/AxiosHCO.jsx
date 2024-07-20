'use client'
import React from "react";
import Loading from "../Loading";
import Error from "../error/Error";

const AxiosHCO = ({
  isLoading,
  isError,
  errorMessage,
  children
}) => {
  if(isError) return <Error message={errorMessage} />
  if(isLoading) return <Loading />
  
  return (
    <>
      {children}
    </>
  );
};

export default AxiosHCO;
