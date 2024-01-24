// import React from "react";
// import { Navigate } from "react-router-dom";
// import { getUserRole } from "../Util/GetUserData";
// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   // Move authentication check inside the component
//   const isAuthenticated = sessionStorage.getItem("authToken");
//   const userRole = getUserRole();
//   // Check if authenticated and user has admin role, or if adminOnly is required
//   console.log({ isAuthenticated, userRole});
//   if (
//     (isAuthenticated === "true" && userRole === "admin") ||
//     (adminOnly && userRole !== "admin")
//   ) {
//     return <Navigate to="/admin" />;
//   } else if (!isAuthenticated) {
//     return <Navigate to="/Login" /> || <Navigate to="/Signup" />;
//   } 

//   // If authenticated and adminOnly is not required, render children
//   return children;
// };

// export default ProtectedRoute;
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getUserRole } from "../Util/GetUserData";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  // Move authentication check inside the component
  const isAuthenticated = sessionStorage.getItem("authToken");
  const userRole = getUserRole();
  
  // Check if adminOnly is required and user is not an admin
  if (adminOnly && userRole !== "admin") {
    return <Navigate to="/error" />;
  } else if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // If authenticated and adminOnly is not required, render children
  return children;
};

export default ProtectedRoute;
