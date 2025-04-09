import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import "../pagescss/loader.css";
import { RESULTSCRAPEURL } from "../constants.js";
import { BACKENDURL } from "../constants.js";
const ResultsScraper = () => {
    const { user } = useContext(AuthContext);
    const [link, setLink] = useState("");
    const [studentList, setStudentList] = useState([]);
    const [selectedRollNumbers, setSelectedRollNumbers] = useState([]);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [studentsLoading, setStudentsLoading] = useState(true);
    const [selectAll, setSelectAll] = useState(false);

    // Fetch students from backend on mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.post(`${BACKENDURL}/api/v1/student/getstudents`, {
                    mentorid: user._id
                });
                console.log("Fetched students:", response.data);
                setStudentList(response.data.data);
                console.log("Student list:", studentList);
            } catch (err) {
                console.error("Error fetching student data", err);
                setError("Failed to fetch student list.");
            } finally {
                setStudentsLoading(false);
            }
        };

        if (user?._id) {
            fetchStudents();
        }
    }, [user]);

    const handleRollNumberChange = (rollNumber) => {
        setSelectedRollNumbers((prev) =>
            prev.includes(rollNumber)
                ? prev.filter((roll) => roll !== rollNumber)
                : [...prev, rollNumber]
        );
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedRollNumbers([]);
        } else {
            setSelectedRollNumbers(studentList.map(student => student.rollnumber));
        }
        setSelectAll(!selectAll);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${RESULTSCRAPEURL}/getresults`, {
                link,
                rollnumbers: selectedRollNumbers,
            });
            setResults(response.data);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.error || "An error occurred while fetching results."
            );
        } finally {
            setLoading(false);
        }
    };
    const downloadCSV = () => {
        if (results.length === 0) return;
    
        let csvContent = "Roll Number,Name,Subjects,SGPA,CGPA\n";
    
        results.forEach(result => {
            const subjectInfo = result.subjects.map(sub => 
                `${sub.subject} - ${sub.grade} (${sub.status}, ${sub.credits} credits)`
            ).join(" | ");
    
            const row = [
                result.rollNumber,
                result.name,
                `"${subjectInfo}"`, // wrap in quotes to handle commas
                result.sgpa ?? "N/A",
                result.cgpa ?? "N/A"
            ].join(",");
    
            csvContent += row + "\n";
        });
    
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "menteesResults.csv";
        link.click();
    };
    

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {user.isadmin || user.ismentor ? (
                <>
                    {(loading || studentsLoading) && (
                        <div className="loader-overlay">
                            <div className="loader">
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                        </div>
                    )}

                    <h1>Results Scraper</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="link">Enter the Link:</label>
                            <input
                                type="text"
                                id="link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                required
                                style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                            />
                        </div>
                        <div>
                            <h3>Select Roll Numbers:</h3>

                            {studentsLoading ? (
                                <p>Loading students...</p>
                            ) : studentList.length === 0 ? (
                                <p>No students found for this mentor.</p>
                            ) : (
                                <>
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                                        gap: "10px"
                                    }}>
                                        {studentList.map((student) => (
                                            <label key={student.rollno} className="custom-checkbox-wrapper">
                                                <input
                                                    type="checkbox"
                                                    className="custom-checkbox-input"
                                                    checked={selectedRollNumbers.includes(student.rollno)}
                                                    onChange={() => handleRollNumberChange(student.rollno)}
                                                />
                                                <div className="custom-checkbox-mark"></div>
                                                {student.rollno}
                                            </label>
                                        ))}
                                    </div>

                                    <label className="custom-checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            className="custom-checkbox-input"
                                            checked={selectAll}
                                            onChange={handleSelectAllChange}
                                        />
                                        <div className="custom-checkbox-mark"></div>
                                        Select All
                                    </label>
                                </>
                            )}
                        </div>

                        <button
                            type="submit"
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "blue",
                                color: "white",
                                border: "none"
                            }}
                            disabled={loading}
                        >
                            {loading ? "Fetching..." : "Get Results"}
                        </button>
                    </form>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {results.length > 0 && (


                        <div style={{ marginTop: "20px" }}>
                            <button
                                onClick={downloadCSV}
                                style={{
                                    marginTop: "10px",
                                    padding: "10px 20px",
                                    backgroundColor: "green",
                                    color: "white",
                                    border: "none"
                                }}
                            >
                                Download Results as CSV
                            </button>

                            <h2>Results</h2>
                            <table border="1" style={{ width: "100%", textAlign: "left" }}>
                                <thead>
                                    <tr>
                                        <th>Roll Number</th>
                                        <th>Name</th>
                                        <th>Subjects</th>
                                        <th>SGPA</th>
                                        <th>CGPA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((result, index) => (
                                        <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                                            <td>{result.rollNumber}</td>
                                            <td>{result.name}</td>
                                            <td>
                                                <ul>
                                                    {result.subjects.map((subject, idx) => (
                                                        <li key={idx}>
                                                            {subject.subject} - {subject.grade} ({subject.status}, {subject.credits} credits)
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>{result.sgpa ?? "N/A"}</td>
                                            <td>{result.cgpa ?? "N/A"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            ) : (
                <p>You do not have permission to access this feature.</p>
            )}
        </div>

    );
};

export default ResultsScraper;
