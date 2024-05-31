import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "components/Auth/Login";
import ThankYou from "views/ThankYou/ThankYou"

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import AdminLayout from "layouts/Admin.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />

        <Route path="/login" component={Login} />

        <Route path="/thank-you" component={ThankYou} />

        {/* <Redirect from="/" to="/admin/dashboard" /> */}
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
    <ToastContainer />
  </>
);
