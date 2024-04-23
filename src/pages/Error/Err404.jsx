import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import "./404.css";
export default function Err404() {
  const error = useRouteError();
  console.log(error);

  const navigate = useNavigate();
  return (
    <div className="err404">
      <h1>404</h1>
      <p>{error.statusText || error.data}</p>
      <Link onClick={() => navigate("/", { replace: true })}>Home</Link>
      <div className="travolta" />
    </div>
  );
}
