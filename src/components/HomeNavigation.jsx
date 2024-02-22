import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const HomeNavigation = () => {
  const { user, logout } = useAuth();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user && (
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/profile">Mi Perfil</Link>
          </li>
        )}
        {user && (
          <li>
            <a href="/" onClick={() => logout()}>
              Logout
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default HomeNavigation;
