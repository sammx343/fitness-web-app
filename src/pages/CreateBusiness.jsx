import React from "react";
import CreateBusinessForm from "../components/CreateBusinessForm";
const CreateBusiness = () => {
  return (
    <div>
      <h2>Crea tu negocio</h2>
      <p>
        Rellena el siguiente formulario para aplicar a la creación de tu propio
        negocio con nosotros.
      </p>
      <p>En caso de ser aprobado, podrás empezar a administrar tus clases.</p>
      <CreateBusinessForm />
    </div>
  );
};

export default CreateBusiness;
