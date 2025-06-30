import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AdminNavigator() {
 const location = useLocation();
 return (
  <>
   {location.pathname === "/admin" ? <Navigate to={"/admin/login"} replace={true} /> : <Outlet />}
  </>
 );
}