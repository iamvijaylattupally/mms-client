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
import { StudentProvider } from "./Contexts/SelectedStudentContext.js"
import { ToastContainer, toast } from 'react-toastify';
import Login from './components/Auth/Login.js';
import 'react-toastify/dist/ReactToastify.css';
import AddMentor from './pages/AddMentor.js';
import AssisgnStudents from './pages/AssisgnStudents.js';
import FetchResult from './pages/FetchResult.js';
import AssignSelectedStudentsToMentor from './pages/AssignSelectedStudentsToMentor.js';
import ApplyLeave from './pages/ApplyLeave.js';
import LeaveStatus from './pages/LeaveStatus.js';
import Calendar from './pages/calendar.js';
const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);
const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: '/login',
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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/addmentor",
        element: <AddMentor />
      },
      {
        path: "/assignstudents",
        element:<AssisgnStudents />
      },
      {
        path: "/fetchresults",
        element:<FetchResult />
      },
      {
        path:"/assign-to-mentor",
        element: <AssignSelectedStudentsToMentor />
      },
      {
        path:"/applyleave",
        element:<ApplyLeave />
      },
      {
        path:"/leavestatus",
        element:<LeaveStatus />
      },
      {
        path:"/calendar",
        element: <Calendar />
      }
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
