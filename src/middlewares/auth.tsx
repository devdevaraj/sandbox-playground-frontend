import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { check } from "../utils/api-client";
import { GlobalContext } from "./context";

export default function Auth() {
 const navigate = useNavigate();
 const [isLogedin, setLoggedin] = useState(false);
 const isVerified = useRef(true);
 const { setUser } = useContext(GlobalContext);

 useEffect(() => {
  if (!localStorage.getItem("token")) {
   navigate("/login", { replace: true });
   return;
  }
  (async () => {
   const res = await check();
   if (!res.isLoggedin) {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    return;
   }
   isVerified.current = res?.user?.user?.isVerified ?? false;
   setLoggedin(true);
   setUser({
    isLoggedin: res.isLoggedin,
    data: res?.user?.user
   });
  })()
 }, []);

 useEffect(() => {
  if (isLogedin && !isVerified.current) {
   navigate("/verify", { replace: true });
   return;
  }
 }, [isLogedin]);

 return (
  <>
   {isLogedin ? <Outlet /> : <h1>Loading...</h1>}
  </>
 );
}