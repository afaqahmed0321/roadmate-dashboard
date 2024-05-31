import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";



function Sidebar({ color, image, routes, UserRoute }) {
  const location = useLocation();
  console.log(routes, "tg5666");
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const roles = localStorage.getItem("roles");

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          // backgroundImage: "url(" + image + ")",
          backgroundColor:'#6f42c1'
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <div className="logo-img mr-2" >
            <img src={require("assets/img/mainLogo.jpeg")} alt="..."/>
          </div>
          ServeOnRoute
        </div>
        <Nav>
          {roles === "super_admin"
            ? routes.map((prop, key) => {
                if (!prop.redirect)
                  return (
                    <li
                      className={
                        prop.upgrade
                          ? "active active-pro"
                          : activeRoute(prop.layout + prop.path)
                      }
                      key={key}
                    >
                      <NavLink
                        to={prop.layout + prop.path}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  );
                return null;
              })
            : UserRoute.map((prop, key) => {
                if (!prop.redirect)
                  return (
                    <li
                      className={
                        prop.upgrade
                          ? "active active-pro"
                          : activeRoute(prop.layout + prop.path)
                      }
                      key={key}
                    >
                      <NavLink
                        to={prop.layout + prop.path}
                        className="nav-link d-flex align-items-center"
                        activeClassName="active"
                      >
                        {prop.icon}
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  );
                return null;
              })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
