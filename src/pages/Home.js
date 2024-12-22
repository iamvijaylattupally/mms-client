import React, { useContext } from 'react';
import "../styles/home.css";
import { AuthContext } from "../Contexts/AuthContext.js";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  
  return (
    <>
      {user?.ismentor &&
        <div className="home">
          <h1>Welcome Mentor</h1>
          <p>Here you can view the list of students and their details.</p>
        </div>
      }
      {user?.isadmin &&
        <div className="home">
          <h1>Welcome admin</h1>
          <p>Here you can view the list of mentors and their details.</p>
        </div>
      }
      {user?.isadmin === false && user?.ismentor === false &&
        <div>
          <h1>Welcome Student</h1>
          <p>Here you can view the list of mentors and their details.</p>
        </div>
      }
    </>
  );
}

export default Home;
