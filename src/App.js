import React from "react";
import "./App.css";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import HomeNavigation from "./components/HomeNavigation";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import UserProfile from "./pages/UserProfile";
import PrivateRoute from "./auth/PrivateRoute";
import NotFound from "./pages/NotFound";
import BusinessProfile from "./pages/BusinessProfile";

function App() {
  return (
    <AuthProvider>
      <h1>Fitness App</h1>
      <BrowserRouter>
        <HomeNavigation></HomeNavigation>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          <Route path="/businesses/:id" element={<BusinessProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
