import React from "react";
import { useRecoilValue } from "recoil";
import { useCookies } from "react-cookie";
import { AUTH_TOKEN } from "../constants/ApiConstant";
import { userDetail } from "../store/auth";
import { Navigate, useLocation } from "react-router-dom";

type IProps = {
  children?: any;
};

const PublicRoute = ({ children }: IProps) => {
  const location = useLocation();
  const [_cookie] = useCookies([AUTH_TOKEN]);
  const isAuth = useRecoilValue(userDetail);

  if (!_cookie.auth_token && !isAuth.isAuth) {
    return children;
  } else {
    return <Navigate to="/main" replace state={{ path: location.pathname }} />;
  }
};

export default PublicRoute;
