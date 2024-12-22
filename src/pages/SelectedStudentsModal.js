import React from "react";
import { useNavigate } from "react-router-dom";
import "../pagescss/modal.css";

const SelectedStudentsModal = ({ students, onClose }) => {
    const navigate = useNavigate();

    const handleAssignToMentor = () => {
        navigate("/assign-to-mentor", { state: { selectedStudents: students } });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Selected Students</h2>
                <ul>
                    {students.map((student, index) => (
                        <li key={index}>
                            {student.rollno} - {student.fullname}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} className="btn btn-danger">
                    Change Selection
                </button>
                <button onClick={handleAssignToMentor} className="btn btn-success">
                    Assign To Mentor
                </button>
            </div>
        </div>
    );
};

export default SelectedStudentsModal;
