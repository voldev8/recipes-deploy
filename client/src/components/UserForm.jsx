import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";

import AlertContext from "../context/alert/alertContext";
import AuthContext from "../context/auth/authContext";

import "./UserForm.css";

const UserForm = ({ form_type, heading }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { login, signup, error, isAuthenticated, clearErrors } = authContext;

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const { name, email, password, password_confirm } = user;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form_type === "login") {
      if (name === "" || password === "") {
        setAlert("Please fill in all fields", "danger");
      } else {
        login({
          name: name.toLowerCase(),
          password,
        });
      }
    }
    if (form_type === "signup") {
      if (name === "" || email === "" || password === "") {
        setAlert("Please fill in all fields", "danger");
      } else if (password !== password_confirm) {
        setAlert("Passwords do not match", "danger");
      } else {
        signup({
          name: name.toLowerCase(),
          email,
          password,
        });
      }
    }
  };

  return (
    <>
      <Header heading={heading} />
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={handleChange}
            />
            <label htmlFor="name">Username</label>
          </div>
          {form_type === "signup" && (
            <div className="form-group">
              <input
                type="text"
                name="email"
                id="email"
                required
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
          )}

          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          {form_type === "signup" && (
            <div className="form-group">
              <input
                type="password"
                name="password_confirm"
                id="password_confirm"
                required
                onChange={handleChange}
              />
              <label htmlFor="password_confirm"> Confirm Password</label>
            </div>
          )}
          <button type="submit" class="btn">
            {form_type.toUpperCase()}
          </button>
        </form>
      </div>
    </>
  );
};

export default UserForm;
