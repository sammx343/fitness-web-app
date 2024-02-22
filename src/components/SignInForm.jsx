import React, { useState } from "react";
import { signIn as signInService } from "../services/auth";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";
import "../styles/buttons.scss";

const SignInForm = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "12345678",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    signInService(formData)
      .then((res) => {
        setFormData({
          email: "",
          password: "",
        });
        signIn(res.data.user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="sign-up">
      <div className="sign-up-container">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
