import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./HomeNavigation.scss";

const HomeNavigation = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="home-navigation">
      <h1>
          <Link to={`/`}>Fitness App</Link>
        </h1>
      <div className="home-navigation__menu">
        <div className="home-navigation__menu-item"> 
          <Link to="/">Home</Link>
        </div>
        {!user && (
          <div className="home-navigation__menu-item">
            <Link to="/signin">Sign In</Link>
          </div>
        )}
        {!user && (
          <div className="home-navigation__menu-item">
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        {user && (
          <div className="home-navigation__menu-item">
            <Link to="/profile">Mi Perfil</Link>
          </div>
        )}
        {user && (
          <div className="home-navigation__menu-item">
            <a href="/" onClick={() => logout()}>
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
export default HomeNavigation;
