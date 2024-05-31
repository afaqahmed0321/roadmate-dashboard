import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation, Link, Router } from "react-router-dom";

import axios from "axios";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";

import routes from "routes.js";
import { GrNotification } from "react-icons/gr";

function Header() {
  const [notificationModal, setNotificationModal] = useState(false);
  const [notification, setNotification] = useState([]);
  const location = useLocation();
  const history = useHistory();

  const getNotifications = async () => {
    const headers = {
      authorization: localStorage.getItem("authorization"),
    };
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/v1/notifications`,
      {
        headers,
      }
    );
    setNotification(response.data.docs);

    console.log("Notification Response", response.data.docs);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  function toTitleCase(str) {
    return str
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }

    const parts = location.pathname.split("/"); 
    const lastPart = parts[parts.length - 2];
    if (lastPart && lastPart !== "/") {
      const resultString = toTitleCase(lastPart);
      return resultString;
    } else {
      return "Brand";
    }
  };
  const handleLogout = async () => {
    try {
      const headers = {
        authorization: localStorage.getItem("authorization"),
      };
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/v1/auth/logout`,
        {
          headers,
        }
      );
      if (response.data.message === "Successfully Logged out") {
        localStorage.clear();
        history.push("/login");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid style={{ position: "relative" }}>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
              
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <GrNotification
                  size={20}
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    setNotificationModal((pre) => !pre);
                  }}
                />
                {/* <span className="no-icon">Profile</span> */}
              </Nav.Link>
            </Nav.Item>
            {/* <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >
                <span className="no-icon">Dropdown</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Action
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Another action
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Something
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Something else here
                </Dropdown.Item>
                <div className="divider"></div>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Separated link
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                {/* <Link to="/login"> */}
                <span className="no-icon" onClick={handleLogout}>
                  Log out
                </span>
                {/* </Link> */}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        {notificationModal && (
          <div
            style={{
              width: "260px",
              height: "400px",
              position: "absolute",
              zIndex: 23,
              right: 115,
              top: 43,
              borderRadius: "10px",
              backgroundColor: "whitesmoke",
              overflowY: "auto",
            }}
          >
            {notification.map((val) => {
              return (
                <div
                  style={{
                    marginTop: "10px",
                    border: "1px solid black",
                    borderTop: 0,
                    borderRight: "0",
                    borderLeft: 0,
                    fontSize: 15,
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: "bold" }}>
                    {val?.title || "No Tilte"}
                  </div>
                  {val?.body || "No Body"}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
