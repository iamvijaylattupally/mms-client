import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext.js";
import axios from "axios";
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import { BACKENDURL } from "../constants.js";
const ApplyLeave = () => {
  const { user } = useContext(AuthContext);

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [salutation, setSalutation] = useState(`Yours Faithfully,\n${user?.fullname || ""}`);

  const handleSubmit = async () => {
    if (!user?.mentorid) {
      toast.error("You are not assigned to any mentor");
      return;
    }
  
    try {
      const applicationdate = new Date(); // Current date
      const data = {
        from: user?.rollno,
        to: user?.mentorid,
        subject,
        body,
        salutation,
        applicationdate,
      };
  
      const response = await axios.post(`${BACKENDURL}/api/v1/student/applyleave`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Leave application submitted successfully:", response.data);
      toast.success("Leave application submitted successfully!");
    } catch (error) {
      console.error("Error submitting leave application:", error);
      toast.error("Failed to submit leave application. Please try again.");
    }
  };
  

  const handleCheckStatus = () => {
    console.log("Navigating to application status...");
    // Add logic for navigation or displaying application status
  };

  return (
    <>
      {!user?.isadmin && !user?.ismentor && (
        <div className="container mt-5">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center mb-0">Apply for Leave</h2>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject:
                  </label>
                  <textarea
                    id="subject"
                    className="form-control"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject"
                    rows="2"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="body" className="form-label">
                    Body:
                  </label>
                  <textarea
                    id="body"
                    className="form-control"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter leave details"
                    rows="5"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="salutation" className="form-label">
                    Salutation:
                  </label>
                  <textarea
                    id="salutation"
                    className="form-control"
                    value={salutation}
                    onChange={(e) => setSalutation(e.target.value)}
                    placeholder="Enter salutation"
                    rows="2"
                  />
                </div>
                <button
                  className="btn btn-primary w-100 mb-3"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <Link to="/leavestatus">
                <button
                  className="btn btn-secondary w-100"
                  onClick={handleCheckStatus}
                >
                  Click to see application status
                </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyLeave;
