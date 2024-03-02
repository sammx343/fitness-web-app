import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext"; // Replace with your context path
import { createBusiness } from "../services/businesses";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../AppRoutes.json";

function CreateBusinessForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors({});

    const hasErrors = [name, address, email, description].some(
      (field) => !field
    );
    if (hasErrors) {
      setErrors({ ...errors, general: "Please fill in all required fields." });
      return;
    }

    const newBusiness = {
      name,
      address,
      email,
      description,
      userId: user._id,
    };

    createBusiness(newBusiness)
      .then((res) => {
        navigate(AppRoutes.home);
      })
      .catch((error) => {
        alert("could not create business");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <span className="error">{errors.address}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}
      </div>

      {errors.general && <span className="error">{errors.general}</span>}

      <button type="submit">Create Business</button>
    </form>
  );
}

export default CreateBusinessForm;
