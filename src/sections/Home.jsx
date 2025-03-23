import React from "react";
import { Link } from "react-router-dom";
import logo from "/vite.svg"

const Home = () => {
  return (
    <div className="content-container align-center">
      <img src={logo} alt="logo" className="big-logo"/>
      <h1>Welcome to the Tree Planting Simulator</h1>
      <p>
        You will be able to do simulations!!!!
      </p>
    </div>
  );
};

export default Home;
