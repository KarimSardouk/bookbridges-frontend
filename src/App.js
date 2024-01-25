import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Quotes from "./Components/Quotes";
import Categories from "./Components/Categories";
import AdminDashboard from "./Components/AdminDashboard";
import AdminUsers from "./Components/AdminUsers";
import AdminBooks from "./Components/AdminBooks";
import AdminQuotes from "./Components/AdminQuotes";
import ProtectedRoute from "./Components/ProtectedRoute";
import Bookshelf from "./Components/Bookshelf";
import MoreInfo from "./Components/MoreInfo";
import ErrorPage from "./Components/ErrorPage.jsx";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
                <Home />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/moreinfo/:id" element={<MoreInfo />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/books"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quotes"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminQuotes />
              </ProtectedRoute>
            }
          />
          <Route path="/bookshelf" element={<Bookshelf />} />
          <Route path="/*" element={<ErrorPage message="Page not found" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
