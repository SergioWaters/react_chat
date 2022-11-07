import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ isAuth, to = "/", children }) => {
  console.log('from HOC ', isAuth.isAuth)
  return !!isAuth ? children : <Navigate to={to} replace />;
};

export const PublicRoute = ({ isAuth, to = "/", children }) => {
  console.log('from HOC ', isAuth.isAuth)
  return !isAuth ? children : <Navigate to={to} replace />;
};