import React, { useContext } from "react";
import "../styles/home.css";
import { AuthContext } from "../Contexts/AuthContext.js";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user?.ismentor && (
        <div className="trees-container">
          <Link to="/leavestatus">
            <div className="trees-card">
              <p className="trees-card-text">Inspect Leave</p>
            </div>
          </Link>
          <div className="trees-card">
            <p className="trees-card-text">Inspect Attendance</p>
          </div>
          <Link to="/events">
            <div className="trees-card">
              <p className="trees-card-text">Events</p>
            </div>
          </Link>
          <Link to="/noticeboard">
          <div className="trees-card">
            <p className="trees-card-text">Notice Board</p>
          </div>
          </Link>
          <Link to="/timetable">
          <div className="trees-card">
            <p className="trees-card-text">Timetable</p>
          </div>
          </Link>
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
          <Link to="/noticeboard">
          <div className="trees-card">
            <p className="trees-card-text">Notice Board</p>
          </div>
          </Link>
          <Link to="/events">
            <div className="trees-card">
              <p className="trees-card-text">Events</p>
            </div>
          </Link>
          <Link to="/timetable">
          <div className="trees-card">
            <p className="trees-card-text">Timetable</p>
          </div>
          </Link>
          <Link to="/profile">
          <div className="trees-card">
            <p className="trees-card-text">Inspect Profile</p>
          </div>
          </Link>
          <div className="trees-card">
            <p className="trees-card-text">Know Your Mentor</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
