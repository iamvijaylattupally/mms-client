import React, { useState,useContext } from "react";
import { toast } from "react-toastify";
import "../pagescss/loader.css";
import axios from "axios";
import { BACKENDURL } from "../constants.js";
import { AuthContext } from "../Contexts/AuthContext.js";
const AddMentor = () => {
    const [mentor, setMentor] = useState({
        fullname: "",
        password: "",
        cpassword: "",
        mobile: "",
        rollno: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (mentor.password !== mentor.cpassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }
        // Simulate form submission (you can replace this with actual form submission logic)
        await axios.post(`${BACKENDURL}/api/v1/mentor/signup`,mentor).then((res) => {
            console.log(res);
            toast.success("Mentor Added Successfully");
            setMentor({
                fullname: "",
                password: "",
                cpassword: "",
                mobile: "",
                rollno: "",
            });
        })
            .catch((err) => {
                console.log(err);
                toast.error("Error in adding Mentor");
            });
            setIsLoading(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMentor((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    return (
        <>{user.isadmin && (
            <>
            {isLoading && (
                <div className="loader-overlay">
                    <div class="loader">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                    </div>

                </div>
            )}
            <div className={`container ${isLoading ? 'blurred' : ''}`}>
                <h1 className="text-center text-capitalize">Fill Mentor Details</h1>
                <form id="application-form" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <div className="row">
                            <div className="col">
                                <p>
                                    <strong>Enter FullName :</strong>&nbsp;<span className="text-danger">*</span>
                                </p>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="fullname"
                                    value={mentor.fullname}
                                    onChange={handleChange}
                                    placeholder="Ex. John"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <p>
                            <strong>Enter Mobile Number :</strong>
                            <span className="text-danger">*</span>
                        </p>
                        <input
                            className="form-control"
                            type="text"
                            name="mobile"
                            value={mentor.mobile}
                            onChange={handleChange}
                            placeholder="7777777777"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <p>
                            <strong>Enter Password :</strong>
                            <span className="text-danger">*</span>
                        </p>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={mentor.password}
                            onChange={handleChange}
                            placeholder="********"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <p>
                            <strong>Confirm Your Password :</strong>
                            <span className="text-danger">*</span>
                        </p>
                        <input
                            className="form-control"
                            type="password"
                            name="cpassword"
                            value={mentor.cpassword}
                            onChange={handleChange}
                            placeholder="********"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <p>
                            <strong>Enter Roll Number :</strong>
                            <span className="text-danger">*</span>
                        </p>
                        <input
                            className="form-control"
                            type="text"
                            name="rollno"
                            value={mentor.rollno}
                            onChange={handleChange}
                            placeholder="XXXXXXXXX"
                            required
                        />
                    </div>
                    <div className="justify-content-center d-flex form-group mb-3">
                        <button
                            className="btn btn-primary btn-light m-0 rounded-pill px-4"
                            type="submit"
                            style={{ minWidth: "500px" }}
                            disabled={isLoading} // Disable the button during loading
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            </>
        )}</>
    );
};

export default AddMentor;
