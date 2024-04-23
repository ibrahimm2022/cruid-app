import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchPosts } from "../state/PostSlice";
import { handleLogedIn } from "../state/authSlice";
const Header = () => {
  const dispatch = useDispatch();
  const { isLogedIn } = useSelector((state) => state.auth);
  const Nav = useNavigate();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const handleAuth = () => {
    dispatch(handleLogedIn(isLogedIn ? "logout" : "login"));
    Nav("/", { replace: true });
  };
  return (
    <div className="header">
      <div className="logo">
        <h1>crud app</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to={"/"}>home</NavLink>
          </li>
          <li>
            <NavLink to={"user/add"}>add</NavLink>
          </li>
        </ul>
        <div>
          <Button className="login" onClick={() => handleAuth()}>
            {!isLogedIn ? "login" : "logout"}
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
