import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext.js";
import "../pagescss/profile.css";
import "../pagescss/loader.css";
import { toast } from "react-toastify";
import axios from "axios";
import {BACKENDURL} from "../constants.js";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext); // Assume setUser is provided to update the user context
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({ ...user });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedDetails({ ...user });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Replace this URL with your actual backend endpoint
      const response = await axios.patch(`${BACKENDURL}/api/v1/student/editstudent`, updatedDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedUser = response.data; // Extract updated user details from response
      setUser(updatedUser); // Update user context with new details
      localStorage.setItem("user", JSON.stringify(updatedUser.data));
      window.location.reload();
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const studentDetails = [
    { label: "Full Name", value: updatedDetails.fullname, name: "fullname" },
    { label: "Roll No", value: updatedDetails.rollno, name: "rollno" },
    { label: "Mobile", value: updatedDetails.mobile, name: "mobile" },
    { label: "Date of Birth", value: updatedDetails.dob, name: "dob" },
    { label: "Father's Name", value: updatedDetails.fathername, name: "fathername" },
    { label: "Father's Contact", value: updatedDetails.fathernumber, name: "fathernumber" },
    { label: "Mother's Name", value: updatedDetails.mothername, name: "mothername" },
    { label: "Mother's Contact", value: updatedDetails.mothernumber, name: "mothernumber" },
    { label: "Current Year", value: updatedDetails.curryear, name: "curryear" },
    { label: "Current Semester", value: updatedDetails.currsem, name: "currsem" },
    { label: "CGPA", value: updatedDetails.cgpa, name: "cgpa" },
    { label: "Number of Backlogs", value: updatedDetails.noofbacklogs, name: "noofbacklogs" },
  ];

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      )}
      <div style={{ position: "relative", paddingTop: "20px" }}>
        <h1 className="prof">Welcome {user?.ismentor ? "Mentor" : user?.isadmin ? "Admin" : "Student"}</h1>
        <p className="profp">Your profile information:</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="cars-grid">
          {!isEditing ? (
            studentDetails.map((detail, index) => (
              <div key={index} className="car-card">
                <h3>{detail.label}</h3>
                <p>{detail.value || "N/A"}</p>
              </div>
            ))
          ) : (
            <form onSubmit={handleSubmit} className="edit-form">
              {studentDetails.map((detail, index) => (
                <div key={index} className="car-card">
                  <h3>{detail.label}</h3>
                  <input
                    type="text"
                    name={detail.name}
                    value={detail.value}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="form-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Save Changes"}
                </button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        {!isEditing && !user?.ismentor && !user?.isadmin && (
          <button className="edit-button" onClick={handleEdit}>
            Edit Profile
          </button>
        )}
      </div>
    </>
  );
};

export default Profile;
