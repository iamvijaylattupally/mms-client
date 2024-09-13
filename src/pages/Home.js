import React, { useContext } from 'react';
import "../styles/home.css";
import { AuthContext } from "../Contexts/AuthContext.js";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  
  return (
    <>
      {!user?.ismentor && !user?.isadmin ? (
        <>
          <h1 style={{ textAlign: "center" }}>Welcome</h1>
          <div className='mentorinfo'>
            <table>
              <caption><h3>Your Mentor Info :</h3></caption>
              <tbody>
                <tr>
                  <td>Mentor Name:</td>
                  <td>Name</td>
                </tr>
                <tr>
                  <td>Mentor Phone:</td>
                  <td>Phone</td>
                </tr>
                <tr>
                  <td>Mentor Email:</td>
                  <td>Email</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className='admininfo'>
            <h1>Admin or Mentor Information</h1>
            {/* Add additional admin/mentor info here */}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
