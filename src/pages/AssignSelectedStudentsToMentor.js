import React, { useState, useContext } from 'react';
import { AuthContext } from "../Contexts/AuthContext";
import "../pagescss/loader.css";
import { toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
import { BACKENDURL } from '../constants.js';
import axios from 'axios';

const AssignSelectedStudentsToMentor = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [mentorRollNo, setMentorRollNo] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();
    const { selectedStudents } = location.state || { selectedStudents: [] };

    const handleAssign = async() => {
        if (!mentorRollNo.trim()) {
            setError("Please enter a valid mentor roll number.");
            return;
        }
        console.log(selectedStudents)
        setError("");
        setLoading(true);
        let data = {
            mentorroll:mentorRollNo,
            students:selectedStudents
        }
        await axios.post(`${BACKENDURL}/api/v1/admin/assign`,data).then((res)=>{
            toast.success(`Successfully assigned ${selectedStudents.length} students to mentor ${mentorRollNo}`);
        })
        .catch((err)=>{
            toast.error("Invalid Entries Try Again");
        })
        setLoading(false);
    };

    return (
        <>
            {user.isadmin ? (
                <>
                    {loading ? (
                        <div className="loader-overlay">
                            <div className="loader">
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2>Assign {selectedStudents?.length} Students to Mentor</h2>

                            <div style={{ marginBottom: "20px" }}>
                                <label htmlFor="mentor-rollno" style={{ marginRight: "10px" }}>
                                    Mentor Roll Number:
                                </label>
                                <input
                                    id="mentor-rollno"
                                    type="text"
                                    value={mentorRollNo}
                                    onChange={(e) => setMentorRollNo(e.target.value)}
                                    placeholder="Enter Mentor Roll Number"
                                    style={{
                                        padding: "5px",
                                        fontSize: "14px",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc",
                                    }}
                                />
                                {error && (
                                    <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
                                )}
                            </div>

                            <button
                                onClick={handleAssign}
                                className="btn btn-success"
                                disabled={loading}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                Assign Students
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <h3 style={{ textAlign: "center" }}>You Do not Have Permission To access This Route</h3>
            )}
        </>
    );
};

export default AssignSelectedStudentsToMentor;
