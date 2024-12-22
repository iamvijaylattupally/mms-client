import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectedStudentsModal from './SelectedStudentsModal';
import "../pagescss/checkbox.css";
import "../pagescss/table.css";
import "../pagescss/loader.css";
import { BACKENDURL } from "../constants.js";

const AssignStudents = () => {
    const [students, setStudents] = useState([]);
    const [selectedCount, setSelectedCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pageSize = 10;

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${BACKENDURL}/api/v1/student/getunassignedstudents`);
                if (response.data.success) {
                    const studentsWithSelection = response.data.data.map(student => ({
                        ...student,
                        selected: false
                    }));
                    setStudents(studentsWithSelection);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStudents();
    }, []);

    const handleCheckboxChange = (studentId) => {
        setStudents(prevStudents => {
            const updatedStudents = prevStudents.map(student => {
                if (student._id === studentId) {
                    return { ...student, selected: !student.selected };
                }
                return student;
            });
            const newSelectedCount = updatedStudents.filter(student => student.selected).length;
            setSelectedCount(newSelectedCount);
            return updatedStudents;
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filteredStudents = students.filter(
        (student) =>
            student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollno.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredStudents.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentStudents = filteredStudents.slice(startIndex, startIndex + pageSize);

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const selectedStudents = students.filter(student => student.selected);

    return (
        <div className="col-md-12 search-table-col">
            <div className="header-container">
                <h4>Selected Students: {selectedCount}</h4>
                <div className="search-container">
                    <input
                        type="text"
                        className="search form-control"
                        placeholder="Search By rollno"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="loader-overlay">
                    <div className="loader">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="table-responsive table table-hover table-bordered results center-table">
                        <table className="table table-bordered table-hover">
                            <thead className="bill-header cs">
                                <tr>
                                    <th id="trs-hd" className="col-lg-1">SL. No.</th>
                                    <th id="trs-hd" className="col-lg-3">Student RollNo</th>
                                    <th id="trs-hd" className="col-lg-3">Student Name</th>
                                    <th id="trs-hd" className="col-lg-2">Click to Select Student</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentStudents.length > 0 ? (
                                    currentStudents.map((student, index) => (
                                        <tr key={student._id}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{student.rollno}</td>
                                            <td>{student.fullname}</td>
                                            <td>
                                                <label className="custom-checkbox-wrapper">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-checkbox-input"
                                                        checked={student.selected}
                                                        onChange={() => handleCheckboxChange(student._id)}
                                                    />
                                                    <div className="custom-checkbox-mark"></div>
                                                </label>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="warning no-result">
                                        <td colSpan="4">
                                            <i className="fa fa-warning"></i>&nbsp; No Result !!!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination-container">
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToPage(index + 1)}
                                    className={currentPage === index + 1 ? "active" : ""}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            <div className="d-flex justify-content-center align-items-center vw-100">
                <button className="btn btn-primary m-2" onClick={openModal}>
                    Next
                </button>
            </div>

            {isModalOpen && (
                <SelectedStudentsModal
                    students={selectedStudents}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default AssignStudents;
