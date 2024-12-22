import React, { useContext } from "react";
import "../styles/home.css";
import { AuthContext } from "../Contexts/AuthContext.js";
const Home = () => {
  const { user } = useContext(AuthContext); // Ensure AuthContext is provided
  

  return (
    <>
      {user?.ismentor && (
        <div className="home">
          <h1>Welcome Mentor</h1>
          <p>Here you can view the list of students and their details.</p>
        </div>
      )}
      {user?.isadmin && (
        <div className="home">
          <h1>Welcome Admin</h1>
          <p>Here you can view the list of mentors and their details.</p>
        </div>
      )}
      {!user?.isadmin && !user?.ismentor && (
        <div>
          Student
        </div>
      )}
    </>
  );
};

export default Home;
