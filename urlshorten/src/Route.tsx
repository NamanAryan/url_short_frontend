import { Routes, Route } from "react-router-dom";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import Url from "../src/components/URLShortener";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Url />} />
    </Routes>
  );
};

export default AppRoutes;
