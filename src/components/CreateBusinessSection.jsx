import React from "react";
import { useNavigate } from "react-router-dom";
import routes from "../AppRoutes.json";

const CreateBusinessHomeSection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>
        <strong>
          Tienes un negocio formalizado? Tienes un nombre en mente? Empieza con
          nosotros
        </strong>
      </p>
      <button onClick={() => navigate(routes.businesses.create)}>
        Crear mi negocio!
      </button>
    </div>
  );
};

export default CreateBusinessHomeSection;
