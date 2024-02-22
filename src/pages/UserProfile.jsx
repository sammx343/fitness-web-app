import React, { Fragment, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <Fragment>
      {user && (
        <div>
          <p>Nombre: {`${user.firstName} ${user.lastName}`}</p>
          <p>Correo: {user.email}</p>
          <p>Teléfono: {user.phone}</p>
          <p>Dirección: {user.address}</p>
        </div>
      )}
    </Fragment>
  );
};

export default UserProfile;
