import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import "../pagescss/loader.css";
import { RESULTSCRAPEURL } from "../constants.js";

const mockRollNumbers = [
    { rollNumber: "22B81A05R5", name: "Alice" },
    { rollNumber: "22B81A05R6", name: "Bob" },
    { rollNumber: "22B81A05R3", name: "Charlie" },
    { rollNumber: "22B81A05R4", name: "David" },
    { rollNumber: "22B81A05R5", name: "Alice" },
    { rollNumber: "22B81A05R6", name: "Bob" },
    { rollNumber: "22B81A05R3", name: "Charlie" },
    { rollNumber: "22B81A05R4", name: "David" },
    { rollNumber: "22B81A05R5", name: "Alice" },
    { rollNumber: "22B81A05R6", name: "Bob" },
    { rollNumber: "22B81A05R3", name: "Charlie" },
    { rollNumber: "22B81A05R4", name: "David" },
    { rollNumber: "22B81A05R5", name: "Alice" },
    { rollNumber: "22B81A05R6", name: "Bob" },
    { rollNumber: "22B81A05R3", name: "Charlie" },
    { rollNumber: "22B81A05R4", name: "David" },
];

const ResultsScraper = () => {
    const { user } = useContext(AuthContext);
    const [link, setLink] = useState("");
    const [selectedRollNumbers, setSelectedRollNumbers] = useState([]);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectAll, setSelectAll] = useState(false); // State for "Select All"

    const handleRollNumberChange = (rollNumber) => {
        setSelectedRollNumbers((prev) =>
            prev.includes(rollNumber)
                ? prev.filter((roll) => roll !== rollNumber)
                : [...prev, rollNumber]
        );
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedRollNumbers([]); // Deselect all
        } else {
            setSelectedRollNumbers(mockRollNumbers.map(student => student.rollNumber)); // Select all
        }
        setSelectAll(!selectAll); // Toggle Select All state
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
            console.error(err); // Log error for debugging
            setError(
                err.response?.data?.error || "An error occurred while fetching results."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {user.isadmin || user.ismentor ? (
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
                            
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
                                {mockRollNumbers.map((student) => (
                                    <label key={student.rollNumber} className="custom-checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            className="custom-checkbox-input"
                                            checked={selectedRollNumbers.includes(student.rollNumber)}
                                            onChange={() => handleRollNumberChange(student.rollNumber)}
                                        />
                                        <div className="custom-checkbox-mark"></div>
                                        {student.rollNumber} {/* Display the roll number */}
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
                        </div>
                        <button
                            type="submit"
                            style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none" }}
                            disabled={loading}
                        >
                            {loading ? "Fetching..." : "Get Results"}
                        </button>
                    </form>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {results.length > 0 && (
                        <div style={{ marginTop: "20px" }}>
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
                                        <tr key={index}>
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