import React from "react";
import { useState, useEffect } from "react";
import { getBusinessList } from "../services/businesses";
import { Link } from "react-router-dom";

const BusinessList = () => {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessList().then((res) => {
      setBusinessList(res.data.businesses);
    });
  }, []);

  return (
    <div>
      <h2>Lugares</h2>
      <p>Centros de salud, gimnasios, entrenadores</p>
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

export default BusinessList;
