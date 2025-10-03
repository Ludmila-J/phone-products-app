import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Home from "./Home";
import { Navigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);

  if (!token) return <Navigate to="/login" />;

  return <Home />;
};

export default Dashboard;
