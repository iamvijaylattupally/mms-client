import React, { useContext } from "react";
import "../styles/home.css";
import { AuthContext } from "../Contexts/AuthContext.js";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user?.ismentor && (
        <div className="trees-mentor-home">
          <h1>Welcome Mentor</h1>
          <p>Here you can view the list of students and their details.</p>
        </div>
      )}
      {user?.isadmin && (
        <div className="trees-admin-home">
          <h1>Welcome Admin</h1>
          <p>Here you can view the list of mentors and their details.</p>
        </div>
      )}
      {!user?.isadmin && !user?.ismentor && (
        <div className="trees-container">
          <div className="trees-card">
            <p className="trees-card-text">View Attendance</p>
          </div>
          <div className="trees-card">
            <p className="trees-card-text">One To One Mentoring</p>
          </div>
          <Link to="/applyleave">
          <div className="trees-card">
            <p className="trees-card-text">Apply Leave</p>
          </div>
          </Link>
          <div className="trees-card">
            <p className="trees-card-text">Notice Board</p>
          </div>
          <div className="trees-card">
            <p className="trees-card-text">Events</p>
          </div>
          <div className="trees-card">
            <p className="trees-card-text">Timetable</p>
          </div>
          <div className="trees-card">
            <p className="trees-card-text">Inspect Profile</p>
          </div>
          <div className="trees-card">
            <p className="trees-card-text">Know Your Mentor</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
