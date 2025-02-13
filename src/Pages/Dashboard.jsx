import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Col, Row } from "react-bootstrap";
import Profile from "../Components/Profile";
import MyProjects from "../Components/MyProjects";

function Dashboard() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    
   if (sessionStorage.getItem("username")) {
    setUsername(sessionStorage.getItem("username"))
   } else {
    setUsername("")
   }
  }, []);
  return (
    <>
      <Header insideDashboard/>
      <div
        className="container-fluid"
        style={{ width: "100%", height: "90vh" }}
      >
        <Row>
          {/* My Projects */}
          <Col sm={12} md={8}>
            <h1 className="mt-3">
              Welcome <span className="text-warning fw-bolder">{username}</span>
            </h1>
            <MyProjects/>
          </Col>
          {/* Profile */}
          <Col sm={12} md={4}>
            <Profile />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
