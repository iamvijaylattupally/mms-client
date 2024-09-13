import './App.css';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./components/SideBar/Navbar.js";
import Home from "./pages/Home.js";
import Footer from "./components/Footer/Footer.js";
import Profile from "./pages/Profile.js";
import Signup from "./components/Auth/Signup.js";
import "./App.css";
import AuthWrapper from './components/Auth/AuthWrapper.js';
import { AuthProvider } from './Contexts/AuthContext.js';
import { ToastContainer, toast } from 'react-toastify';
import Login from './components/Auth/Login.js';
import 'react-toastify/dist/ReactToastify.css';


const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);
const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    element: (
      <AuthWrapper>
      <AppLayout />
      </AuthWrapper>
      ),
    children: [
      
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <>  
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer 
      />
    </AuthProvider>
    </>
  );
}

export default App;
