import React from "react";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import HomeNavigation from "./components/HomeNavigation";
import UserProfile from "./pages/UserProfile";
import PrivateRoute from "./auth/PrivateRoute";
import TeachersRoute from "./auth/TeachersRoute";
import NotFound from "./pages/NotFound";
import BusinessProfile from "./pages/BusinessProfile";
import CreateBusiness from "./pages/CreateBusiness";
import routes from "./AppRoutes.json";

function App() {
  return (
    <AuthProvider>
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
          <Route
            path={routes.businesses.create}
            element={
              <TeachersRoute>
                <CreateBusiness />
              </TeachersRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
