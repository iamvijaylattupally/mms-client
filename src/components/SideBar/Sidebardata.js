import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { MdAssignmentAdd } from "react-icons/md";
import FetchResult from "../../pages/FetchResult";
const Sidebardata = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title:"Add Mentor",
    path:"/addmentor",
    icon:<MdAssignmentAdd />,
    cName:"nav-text",
  },
  {
    title:"Assign Students",
    path:"/assignstudents",
    icon:<MdAssignmentAdd />,
    cName:"nav-text",
  },
  {
    title: "FetchResult",
    path:"/fetchresults",
    icon:<MdAssignmentAdd />,
    cName:"nav-text",
  }
];

export default Sidebardata;