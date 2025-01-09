import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext.js";
import axios from "axios";
import { BACKENDURL } from "../constants.js";
import { toast } from "react-toastify";
import LetterModal from "./LetterModal.js";

const LeaveStatus = () => {
  const { user } = useContext(AuthContext);
  const [studentLeaves, setStudentLeaves] = useState([]);
  const [mentorLeaves, setMentorLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      if (!user?.rollno) {
        toast.error("User roll number not found.");
        return;
      }

      try {
        // Fetching student leaves if user is a student
        if (!user?.ismentor && !user?.isadmin) {
          const response = await axios.get(`${BACKENDURL}/api/v1/student/getstudentsleaves`, {
            headers: {
              "Content-Type": "application/json",
            },
            params: { rollno: user?.rollno },
          });
          setStudentLeaves(response.data.leaves);
        }
        // Fetching mentor leaves if user is a mentor
        if (user?.ismentor) {
          const response = await axios.get(`${BACKENDURL}/api/v1/mentor/getmentorleaves`, {
            headers: {
              "Content-Type": "application/json",
            },
            params: { rollno: user?.rollno },
          });
          setMentorLeaves(response.data.leaves);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
        toast.error("Failed to fetch leave applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [user?.rollno, user?.ismentor]);

  const handleViewLetter = (leave) => {
    setSelectedLeave(leave);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLeave(null);
  };

  const handleUpdateLeave = async (leaveId, isAccepted) => {
    try {
      const response = await axios.post(
        `${BACKENDURL}/api/v1/mentor/updateletter`,
        { leaveId, isAccepted },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);

      // Update the local state to reflect the change
      setMentorLeaves((prevLeaves) =>
        prevLeaves.map((leave) =>
          leave._id === leaveId
            ? { ...leave, isAccepted, isPending: false }
            : leave
        )
      );
    } catch (error) {
      console.error("Error updating leave:", error);
      toast.error("Failed to update leave status. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      {/* Student Section */}
      {!user?.ismentor && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">
            <h2 className="text-center mb-0">Leave Application Status</h2>
          </div>
          <div className="card-body">
            {studentLeaves.length > 0 ? (
              <table className="table table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>Application Date</th>
                    <th>Status</th>
                    <th>Accepted</th>
                  </tr>
                </thead>
                <tbody>
                  {studentLeaves.map((leave, index) => (
                    <tr key={leave._id}>
                      <td>{index + 1}</td>
                      <td>{new Date(leave.applicationdate).toLocaleDateString()}</td>
                      <td>
                        {leave.isPending ? (
                          <span className="badge bg-warning text-dark">Pending</span>
                        ) : leave.isAccepted ? (
                          <span className="badge bg-success">Accepted</span>
                        ) : (
                          <span className="badge bg-danger">Rejected</span>
                        )}
                      </td>
                      <td>
                        {leave.isPending ? (
                          <span>-</span>
                        ) : leave.isAccepted ? (
                          <span className="text-success">Yes</span>
                        ) : (
                          <span className="text-danger">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">No leave applications found.</div>
            )}
          </div>
        </div>
      )}

      {/* Mentor Section */}
      {user?.ismentor && (
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h2 className="text-center mb-0">Mentor Leave Applications</h2>
          </div>
          <div className="card-body">
            {mentorLeaves.length > 0 ? (
              <table className="table table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>From</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mentorLeaves.map((leave, index) => (
                    <tr key={leave._id}>
                      <td>{index + 1}</td>
                      <td>{leave.from}</td>
                      <td>{leave.subject}</td>
                      <td>
                        {leave.isPending ? (
                          <span className="badge bg-warning text-dark">Pending</span>
                        ) : leave.isAccepted ? (
                          <span className="badge bg-success">Approved</span>
                        ) : (
                          <span className="badge bg-danger">Rejected</span>
                        )}
                      </td>
                      <td>
                        {leave.isPending && (
                          <>
                            <button
                              className="btn btn-success me-2"
                              onClick={() => handleUpdateLeave(leave._id, true)}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleUpdateLeave(leave._id, false)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          className="btn btn-info mt-2"
                          onClick={() => handleViewLetter(leave)}
                        >
                          View Letter
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">No leave applications found.</div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Viewing Letter */}
      <LetterModal
        showModal={showModal}
        handleClose={handleCloseModal}
        selectedLeave={selectedLeave}
      />
    </div>
  );
};

export default LeaveStatus;
