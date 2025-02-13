import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import titleImage from "../assets/images/web.jpg";
import ProjectCard from "../Components/ProjectCard";
import { toast, ToastContainer } from "react-toastify";
import { getHomeProject } from "../services/allAPI";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allProjects, setAllProjects] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getHomeProjects();
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleProjectsPage = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/projects");
    } else {
      toast.warning("Please login to explore more Projects...");
    }
  };

  const getHomeProjects = async () => {
    // api call
    const result = await getHomeProject();
    console.log(result);
    if (result.status == 200) {
      setAllProjects(result.data);
    } else {
      console.log(result);
    }
    console.log(allProjects);
  };
  return (
    <>
      <div
        style={{ height: "90vh", width: "100%" }}
        className="container-fluid  bg-info"
      >
        <Row className="d-flex h-100 align-items-center  p-4">
          <Col sm={12} md={6}>
            <h1
              style={{ fontSize: "80px" }}
              className="fw-bolder text-light mt-5"
            >
              <i className="fa-solid fa-list-check me-2"></i>Project-Fair
            </h1>
            <p className="text-light">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi,
              pariatur ad. Adipisci deleniti ad quos asperiores rem non
              doloremque assumenda reiciendis praesentium! Debitis mollitia
              repellat nihil laudantium, deserunt iure optio.
            </p>
            {isLoggedIn ? (
              <Link to={"/dashboard"} className="btn btn-warning">
                Manage Your Projects
              </Link>
            ) : (
              <Link to={"/login"} className="btn btn-warning">
                Start to Explore
              </Link>
            )}
          </Col>
          <Col sm={12} md={6}>
            <img src={titleImage} width={"500px"} alt="" />
          </Col>
        </Row>
      </div>

      {/* All Projects */}
      <div className="allProject mt-5">
        <h1 className="text-center text-primary fw-bolder">
          Explore Your Projects
        </h1>
        <marquee behavior="" direction="" scrollAmount="25">
          <Row>
            {allProjects.length > 0
              ? allProjects.map((project) => (
                  <Col sm={12} md={6} lg={4}>
                    <ProjectCard project={project} />
                  </Col>
                ))
              : null}
          </Row>
        </marquee>
      </div>
      <div className="text-center">
        <p className="btn" onClick={handleProjectsPage}>
          View More Projects
        </p>
      </div>
      <ToastContainer theme="colored" autoClose={2000} position="top-center" />
    </>
  );
}

export default Home;
