import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import "./styles.css";

const Signup = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [storedUser, setStoredUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState({
    fullname: '',
    mobile: "",
    password: '',
    cpassword: '',
    rollno: '',
    dob:'',
    fathername:'',
    mothername:'',
    fathernumber:'',
    mothernumber:'',
    curryear:'',
    currsem:'',
    noofbacklogs:'',
    cgpa:''
  });

  useEffect(() => {
    const setFormHeight = () => {
      const activePanel = document.querySelector('.js-active');
      if (activePanel) {
        document.querySelector('.multisteps-form__form').style.height = `${activePanel.offsetHeight}px`;
      }
    };

    window.addEventListener('resize', setFormHeight);
    setFormHeight();

    return () => window.removeEventListener('resize', setFormHeight);
  }, [activeStep]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setStoredUser(JSON.parse(user));
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const steps = ['User Info', 'About', 'Personal details', 'Academic Review and Credentials'];

  const notify = () => {
    toast.success("Signup successful!");
  };

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleStepClick = (stepIndex) => {
    setActiveStep(stepIndex);
  };
  const checkEmptyOrNull = () => {
    for (const [key, value] of Object.entries(userData)) {
      if (value === '' || value === null) {
        console.log(`${key} is empty or null.`);
        toast.error(`Please fill the ${key}`);
        return false;
      }
    }
    return true;
  }
  const handleSignup = async(e) => {
    e.preventDefault();
    if(userData.password !== userData.cpassword){
      toast.error("Passwords do not match!");
      return;
    }
    if(checkEmptyOrNull()){

      await axios.post("https://mms-server-2s8s.onrender.com/api/v1/auth/register",userData).then((res) => {
        console.log(res);
        const user = res.data.data;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        toast.success("Signup Successfull");
        navigate('/');
      })
      .catch((err) => {
          toast.error("Invalid Credentials Try Again");
      })
    }
    
    
  };
  const handlelogin = () => {
    navigate('/login');
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!storedUser && (
        <section>
          <div className="container overflow-hidden" style={{ marginTop: '0px', marginBottom: '10px', paddingBottom: '300px', paddingTop: '57px' }}>
            <div className="multisteps-form">
              <div className="row">
                <div className="col-12 col-lg-8 ml-auto mr-auto mb-4">
                  <div className="multisteps-form__progress">
                    {steps.map((step, index) => (
                      <button
                        key={index}
                        className={`btn multisteps-form__progress-btn ${index <= activeStep ? 'js-active' : ''}`}
                        onClick={() => handleStepClick(index)}
                        type="button"
                      >
                        {step}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-lg-8 m-auto">
                  <form className="multisteps-form__form">
                    {/* User Info Panel */}
                    <FormPanel isActive={activeStep === 0}>
                      <h3 className="text-center multisteps-form__title">User Info</h3>
                      <div className="multisteps-form__content">
                        {/* User Info Form Fields */}
                        <div className="form-row mt-4">
                          <div className="col-12 col-sm-6">
                            <input className="form-control finp multisteps-form__input" type="text" required placeholder="Enter full name" name="fullname" value={userData.fullname} onChange={handleChange} />
                          </div>
                          <div className="col-12 col-sm-6 mt-4 mt-sm-0">
                            <input className="form-control finp multisteps-form__input" type="text" required placeholder="Enter mobile number" name="mobile" value={userData.mobile} onChange={handleChange} />
                          </div>
                          <div className="col-12 col-sm-6 mt-4 mt-sm-0">
                            <input className="form-control finp multisteps-form__input" type="text" required placeholder="Enter Roll Number" name="rollno" value={userData.rollno} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="button-row d-flex mt-4">
                          <button className="btn fbtn btn-primary ml-auto" type="button" onClick={handleNext}>
                            Next
                          </button>
                          <button type="button" onClick={handlelogin} class="btn btn-link" style={{color:'blue'}}>Already a User? login</button>
                        </div>
                      </div>
                    </FormPanel>

                    {/* About Panel */}
                    <FormPanel isActive={activeStep === 1}>
                      <h3 className="text-center multisteps-form__title">About</h3>
                      <div className="multisteps-form__content">
                        <div className="form-row mt-4">
                          <div className="col-12 col-sm-6">
                            <input className="form-control finp multisteps-form__input" type="date" required name="dob" value={userData.dob} onChange={handleChange} />
                          </div>
                          <div className="col-12 col-sm-6">
                            <input className="form-control finp multisteps-form__input" type="text" required placeholder="Enter Your Current Year(1/2/3/4)" name="curryear" value={userData.curryear} onChange={handleChange} />
                          </div>
                          <div className="col-12 col-sm-6">
                            <input className="form-control finp multisteps-form__input" type="text" required placeholder="Enter Your Current semester(1/2)" name="currsem" value={userData.currsem} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="button-row d-flex mt-4">
                          <button className="btn fbtn btn-primary" type="button" onClick={handlePrev}>
                            Prev
                          </button>
                          <button className="btn fbtn btn-primary ml-auto" type="button" onClick={handleNext}>
                            Next
                          </button>
                        </div>
                      </div>
                    </FormPanel>

                    {/* Personal Details Panel */}
                    <FormPanel isActive={activeStep === 2}>
                      <h3 className="text-center multisteps-form__title">Personal details</h3>
                      <div className="multisteps-form__content">
                        <div className="form-row mt-4">
                          <div className="col-12 col-sm-6">
                            <input className="form-control finp multisteps-form__input" type="text" required placeholder="Enter father name" name="fathername" value={userData.fathername} onChange={handleChange} />
                          </div>
                          <div className="col-12 col-sm-6">
                            <input className="form-control finp multisteps-form__input" type="text" required placeholder="Enter father number" name="fathernumber" value={userData.fathernumber} onChange={handleChange} />
                          </div>
                          <div className="col-12 col-sm-6">
                            <input className="form-control finp multisteps-form__input" type="text" required placeholder="Enter mother name" name="mothername" value={userData.mothername} onChange={handleChange} />
                          </div>
                          <div className="col-12 col-sm-6">
                            <input className="form-control finp multisteps-form__input" type="text" required placeholder="Enter mother number" name="mothernumber" value={userData.mothernumber} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="button-row d-flex mt-4">
                          <button className="btn fbtn btn-primary" type="button" onClick={handlePrev}>
                            Prev
                          </button>
                          <button className="btn fbtn btn-primary ml-auto" type="button" onClick={handleNext}>
                            Next
                          </button>
                        </div>
                      </div>
                    </FormPanel>
                    <FormPanel isActive={activeStep === 3}>
                      <h3 className="text-center multisteps-form__title">Academic Review and Credentials</h3>
                      <div className="multisteps-form__content">
                        <div className="form-row mt-4">
                          <div className="col-12 col-sm-6">
                            <input className="form-control finp multisteps-form__input" type="text" required placeholder="Enter CGPA" name="cgpa" value={userData.cgpa} onChange={handleChange} />
                          </div>
                          <div className="col-12 col-sm-6">
                            <input className="form-control finp multisteps-form__input" type="text" required placeholder="Enter Number of Backlogs" name="noofbacklogs" value={userData.noofbacklogs} onChange={handleChange} />
                          </div>
                          <div className="col-12 col-sm-6">
                            <input className="form-control finp multisteps-form__input" type="password" required placeholder="Create the password" name="password" value={userData.password} onChange={handleChange} />
                          </div>
                          <div className="col-12 col-sm-6">
                            <input className="form-control finp multisteps-form__input" type="password" required placeholder="Confirm the password" name="cpassword" value={userData.cpassword} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="button-row d-flex mt-4">
                          <button className="btn fbtn btn-primary" type="button" onClick={handlePrev}>
                            Prev
                          </button>
                          <button className="btn fbtn btn-primary ml-auto" type="button" onClick={handleSignup}>
                            Submit
                          </button>
                        </div>
                      </div>
                    </FormPanel>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
    </>
  );
};

const FormPanel = ({ isActive, children }) => (
  <div className={`multisteps-form__panel shadow p-4 rounded bg-white ${isActive ? 'js-active' : ''}`} data-animation="scaleIn">
    {children}
  </div>
);

export default Signup;
