import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const RootLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavbarProps = () => {
    switch (location.pathname) {
      case "/":
        return {
          showBackButton: false,
        };
      case "/signin":
        return {
          showBackButton: true,
          onBackClick: () => navigate("/"),
          backButtonText: "Back to home",
        };
      case "/signup":
        return {
          showBackButton: true,
          onBackClick: () => navigate("/"),
          backButtonText: "Back to home",
        };
      default:
        return {
          showBackButton: true,
          onBackClick: () => navigate("/"),
          backButtonText: "Back to home",
        };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar {...getNavbarProps()} />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
