import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import "../pagescss/loader.css";
import {BACKENDURL,RESULTSCRAPEURL} from "../constants.js";
const ResultsScraper = () => {
    const { user } = useContext(AuthContext);
    const [link, setLink] = useState("");
    const [rollnumbers, setRollnumbers] = useState(""); // Input as comma-separated values
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const rollNumbersArray = rollnumbers.split(",").map((roll) => roll.trim());

        try {
            const response = await axios.post(`${RESULTSCRAPEURL}/getresults`, {
                link,
                rollnumbers: rollNumbersArray,
            });
            setResults(response.data);
        } catch (err) {
            console.log(err)
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
                            <label htmlFor="rollnumbers">Enter Roll Numbers (comma-separated):</label>
                            <input
                                type="text"
                                id="rollnumbers"
                                value={rollnumbers}
                                onChange={(e) => setRollnumbers(e.target.value)}
                                required
                                style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                            />
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
