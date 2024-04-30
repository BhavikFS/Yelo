import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  return !data && !data?.jwt ? (
    <Outlet />
  ) : (
    <>
      {data?.role === "user" ? (
      <Navigate to="/" />
      ) : (
      <Navigate to="/provider-listing" />
      )}
    </>
  );
};
