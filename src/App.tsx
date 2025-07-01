import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PlaygroundWrapper from "./components/wrappers/playground-wrapper";
import AdminNavigator from "./components/admin-navigator";
import { GlobalContext } from "./middlewares/context";
import Sessions from "./components/sessions/sessions";
import GitHubCallback from "./components/callback";
import DarkButton from "./components/dark-button";
import AdminAuth from "./middlewares/admin-auth";
import AdminLogin from "./pages/admin-login";
import PopupTerminal from "./pages/terminal";
import Loading from "./components/loading";
import VerifyKey from "./pages/verify-key";
import Dashboard from "./pages/dashboard";
import Auth from "./middlewares/auth";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Home from "./pages/home";
import './App.css';

export const origin = import.meta.env.DEV ? "http://localhost:3000" : location.origin;
// export const origin = false ? "http://localhost:3000" : location.origin;
axios.defaults.baseURL = origin;

function App() {
 const [user, setUser] = useState<UserType>({
  isLoggedin: false,
  data: {}
 });

 return (
  <main className="min-h-screen bg-background text-foreground">
   <DarkButton />
   <GlobalContext.Provider value={{
    user,
    setUser
   }}>
    <Suspense fallback={<Loading />}>
     <Toaster position="top-center" />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/github/callback" element={<GitHubCallback />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Auth />}>
       <Route path="/verify" element={<VerifyKey />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/terminal/:vm/:id" element={<PopupTerminal />} />

       <Route path="/playground/:id" element={<PlaygroundWrapper />}>
        <Route path=":session" element={<Sessions />} />
       </Route>

      </Route>
      <Route path="/admin" element={<AdminNavigator />}>
       <Route path="login" element={<AdminLogin />} />
       <Route element={<AdminAuth />}>
        <Route path="dashboard" element={<Admin />} />
       </Route>
      </Route>
     </Routes>
    </Suspense>
   </GlobalContext.Provider>
  </main>
 );
}

export default App
