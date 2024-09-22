import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
