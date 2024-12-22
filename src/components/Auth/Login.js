import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthContext.js';
import { BACKENDURL } from "../../constants.js";
import "../../pagescss/loader.css";
const Login = () => {
    const navigate = useNavigate();
    const [loginas, setLoginas] = useState(0);
    const { setUser } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        rollno: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleSignup = () => {
        navigate('/signup');
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);  // Show loader when login starts
        
        try {
            let response;
            switch (loginas) {
                case 0:
                    response = await axios.post(`${BACKENDURL}/api/v1/auth/login`, userData);
                    break;
                case 2:
                    response = await axios.post(`${BACKENDURL}/api/v1/admin/login`, userData);
                    break;
                default:
                    response = await axios.post(`${BACKENDURL}/api/v1/mentor/login`, userData);
                    setIsLoading(false);  // Hide loader on invalid login
                    
            }
            const user = response.data.data;
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            toast.success("Login Successful");
            navigate('/');
        } catch (error) {
            toast.error("Invalid Credentials. Try Again");
        } finally {
            setIsLoading(false);  // Hide loader after login
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    return (
        <>
            {isLoading && (
                <div className="loader-overlay">
                    <div className="loader">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
            )}
            <section className={`position-relative py-4 py-xl-5 ${isLoading ? 'blurred' : ''}`}>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 col-xl-4">
                            <div className="card mb-5">
                                <div className="card-body d-flex flex-column align-items-center">
                                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                                        </svg>
                                    </div>
                                    <form className="text-center">
                                        <h2 className="fw-bold">{loginas === 0 ? "Student " : loginas === 1 ? "Mentor " : "Admin "}Login</h2>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="rollno"
                                                placeholder="Enter Roll No"
                                                value={userData.rollno}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="password"
                                                placeholder="Enter Password"
                                                value={userData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <button className="btn btn-primary d-block w-100" type="submit" onClick={handleLogin} disabled={isLoading}>
                                                Login
                                            </button>
                                        </div>
                                        <button type="button" onClick={handleSignup} className="btn btn-link" style={{ color: 'blue' }}>New User? Signup</button>
                                        <br />
                                        <button type="button" style={{ color: 'blue' }} className="btn btn-link">Forgot your password?</button>
                                        <button type="button" style={{ color: 'blue' }} onClick={() => { setLoginas(2) }} className="btn btn-link">{loginas === 2 ? "" : "Click here To Login as Admin"}</button>
                                        <button type="button" style={{ color: 'blue' }} onClick={() => { setLoginas(1) }} className="btn btn-link">{loginas === 1 ? "" : "Click here To Login as Mentor"}</button>
                                        <button type="button" style={{ color: 'blue' }} onClick={() => { setLoginas(0) }} className="btn btn-link">{loginas === 0 ? "" : "Click here To Login as Student"}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
