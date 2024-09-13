import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { AuthContext } from '../../Contexts/AuthContext.js';



const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [userData , setUserData] = useState({
        rollno:'',
        password:''
    })


    const handleSignup = () => {
        navigate('/signup');
    }


    const handleLogin = async(e) => {
        e.preventDefault();
        
        await axios.post("http://localhost:8000/api/v1/auth/login",userData).then((res) => {
          console.log(res);
          const user = res.data.data;
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          toast.success("Login Successfull");
          navigate('/');
        })
        .catch((err) => {
            toast.error("Invalid Credentials Try Again");
        })
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
        <section className="position-relative py-4 py-xl-5">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
              <div className="card mb-5">
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="bi bi-person"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                    </svg>
                  </div>
                  <form className="text-center">
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
                      <button className="btn btn-primary d-block w-100" type="submit" onClick={handleLogin}>
                        Login
                      </button>
                    </div>
                    <button type="button" onClick={handleSignup} class="btn btn-link" style={{color:'blue'}}>New User? Signup</button>
                    <br/>
                    <button type="button" style={{color:'blue'}} class="btn btn-link">Forgot your password?</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login