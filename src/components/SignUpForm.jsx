import React, { useState } from "react";
import { signUp } from "../services/auth";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";
import "../styles/buttons.scss";

const SignUpForm = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "Sebastian",
    lastName: "Mayor",
    password: "12345678",
    email: "naitsabes29@gmail.com",
    phone: "3017773031",
    address: "cra 23 no.50-27",
    role: "student",
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
          role: "student",
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
          Nombres:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Apellidos:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Correo eléctronico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Dirección:
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Rol:
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={formData.role === "teacher"}
                onChange={handleChange}
              />
              Profesor
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleChange}
              />
              Estudiante
            </label>
          </div>
        </label>
        <button type="submit" className="btn btn-primary">
          Registrate!
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
