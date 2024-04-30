import { Navigate, Outlet } from "react-router-dom";
export const PrivateProviderRoutes = () => {
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  return data?.jwt && data?.role === "provider" ? <Outlet /> : <Navigate to="/provider-login" />;
};

export const PrivateUserRoutes = () => {
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  return data?.jwt && data?.role === "user" ? <Outlet /> : <Navigate to="/login" />;
};
