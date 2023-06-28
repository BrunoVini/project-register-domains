import { Fragment } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import RegisterDomain from "../pages/RegisterDomain";
import ListSubdomains from "../pages/ListSubdomains";

const Private = ({ Item }) => {
  const isLogged = localStorage.getItem("isLogged");

  return isLogged ? <Item /> : <Navigate to="/signin" />;
};

const Login = ({ Item }) => {
  const isLogged = localStorage.getItem("isLogged");

  return !isLogged ? <Item /> : <Navigate to="/home" />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route
            exact
            path="/registerDomain"
            element={<Private Item={RegisterDomain} />}
          />
          <Route
            exact
            path="/listSubdomains/:id"
            element={<Private Item={ListSubdomains} />}
          />
          <Route path="/" element={<Login Item={Signin} />} />
          <Route exact path="/signup" element={<Login Item={Signup} />} />
          <Route path="*" element={<Login Item={Signin} />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
