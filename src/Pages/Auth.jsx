import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI, registerAPI } from "../services/allAPI";
import { TokenAuthContext } from "../ContextAPI/TokenAuth";

function Auth({ register }) {
  const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext);
  const isRegisterForm = register ? true : false;
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      toast.info("please fill missing fields");
    } else {
      // api call
      const result = await registerAPI(userData);
      console.log(result);
      if (result.status == 200) {
        toast.success(`${result.data.username} has successfully registerd`);
        navigate("/login");
        setUserData({
          username: "",
          email: "",
          password: "",
        });
      } else {
        toast.warning(result.response);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      toast.info("Please fill missing fields");
    } else {
      try {
        const result = await loginAPI({ email, password });
        if (result.status == 200) {
          sessionStorage.setItem("username", result.data.existingUser.username);
          sessionStorage.setItem("token", result.data.token);
          navigate("/");
          setIsAuthorized(true);
          setUserData({
            username: "",
            email: "",
            password: "",
          });
        } else {
          toast.warning(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="w-75 container mt-5">
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              color: "blue",
              fontWeight: "bolder",
            }}
          >
            <i class="fa-solid fa-arrow-left me-2"></i> Back to Home
          </Link>
          <div className="card shadow p-5 bg-info">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img
                  src="https://img.freepik.com/free-photo/computer-security-with-login-password-padlock_107791-16191.jpg?t=st=1733120322~exp=1733123922~hmac=92d1160084b4959512f5de5e20901a9a380688acbb68fe1478a71b42dfb7efdc&w=740"
                  alt="image"
                  width={"100%"}
                  className="rounded-start"
                />
              </div>
              <div className="col-lg-6">
                <div className="d-flex align-items-center flex-column">
                  <h1 className="fw-bolder text-light mt-2">
                    <i className="fa-solid fa-list-check me-2"></i>Project-Fair
                  </h1>
                  <h5 className="text-light fw-bolder text-center">
                    {isRegisterForm
                      ? "Sign-Up to Your Account"
                      : "Sign-In to Your Account"}
                  </h5>
                  <Form className="text-light w-100">
                    {isRegisterForm && (
                      <Form.Group
                        className="mb-3"
                        conrtolId="exampleForm.ControlInputName"
                      >
                        <Form.Control
                          type="text"
                          placeholder="enter your name"
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              username: e.target.value,
                            })
                          }
                          value={userData.username}
                        />
                      </Form.Group>
                    )}
                    <Form.Group
                      className="mb-3"
                      conrtolId="exampleForm.ControlInputEmail"
                    >
                      <Form.Control
                        type="email"
                        placeholder="enter your email"
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                        value={userData.email}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      conrtolId="exampleForm.ControlInputpswd"
                    >
                      <Form.Control
                        type="password"
                        placeholder="enter your password"
                        onChange={(e) =>
                          setUserData({ ...userData, password: e.target.value })
                        }
                        value={userData.password}
                      />
                    </Form.Group>
                    {isRegisterForm ? (
                      <div>
                        <button
                          className="btn btn-warning text-light"
                          onClick={handleRegister}
                        >
                          Register
                        </button>
                        <p className="mt-2 fw-bolder">
                          Already Have An Account?Click Here to{" "}
                          <Link
                            to={"/login"}
                            style={{ textDecoration: "none" }}
                            className="text-success"
                          >
                            Login
                          </Link>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="btn btn-success text-light"
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                        <p className="mt-2 fw-bolder">
                          New User?Click Here to{" "}
                          <Link
                            to={"/register"}
                            style={{ textDecoration: "none" }}
                            className="text-danger"
                          >
                            Register
                          </Link>
                        </p>
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Auth;
