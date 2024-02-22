import React, { useState } from "react";
import { signUp } from "../services/auth";
import { useAuth } from "../auth/AuthContext";
import "./SignUp.scss";
import "../styles/buttons.scss";

const SignUpForm = () => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "Sebastian",
    lastName: "Mayor",
    password: "12345678",
    email: "naitsabes29@gmail.com",
    phone: "3017773031",
    address: "cra 23 no.50-27",
    userType: "student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    signUp(formData)
      .then((res) => {
        setFormData({
          firstName: "",
          lastName: "",
          password: "",
          email: "",
          phone: "",
          address: "",
          userType: "student",
        });

        signIn(formData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="sign-up">
      <div className="sign-up-container">
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
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
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Address:
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          User Type:
          <div>
            <label>
              <input
                type="radio"
                name="userType"
                value="teacher"
                checked={formData.userType === "teacher"}
                onChange={handleChange}
              />
              Teacher
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="student"
                checked={formData.userType === "student"}
                onChange={handleChange}
              />
              Student
            </label>
          </div>
        </label>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
