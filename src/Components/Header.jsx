import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { TokenAuthContext } from "../ContextAPI/TokenAuth";

function Header({ insideDashboard }) {
  const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext);

  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    setIsAuthorized(false);
    navigate("/");
  };
  return (
    <>
      <Navbar className="bg-info">
        <Container>
          <Navbar.Brand href="#home">
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              <i className="fa-solid fa-list-check  me-2"></i>
              Project-Fair
            </Link>
          </Navbar.Brand>
          {insideDashboard && (
            <button className="btn btn-warning rounded" onClick={logOut}>
              Logout
            </button>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
