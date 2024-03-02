import React, { useEffect, useState } from "react";
import { getTeacherBusinesses } from "../services/teachers";
import { Link } from "react-router-dom";

const MyBusinesses = ({ businessList }) => {
  return (
    <div>
      <h2>Mi lista de negocios</h2>
      <ul>
        {businessList.length === 0 && <p>Loading ...</p>}
        {businessList.length > 0 &&
          businessList.map((business) => {
            return (
              <li key={business._id}>
                <Link to={`/businesses/${business._id}`}>{business.name}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MyBusinesses;
