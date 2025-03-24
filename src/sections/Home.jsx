import React from "react";
import { Link } from "react-router-dom";
import logo from "/home2.png"

const Home = () => {
  return (
    <div className="home-container align-center">
      <div className="img-container">
        <img src={logo} alt="logo" className="big-logo"/>
        <div class="centered">EVERY EFFORT COUNTS</div>
      </div>
      
      <section>
        <div>
          <h2>Climate change is daunting.</h2>
          <p>And so are the current levels of CO2 that drive it. <b>It may seem like there’s nothing we can do to stop it.</b></p>
        </div>
      </section>
      

      <section class="text-right">
        <div>
            <h2>Fortunately, that’s not true.</h2>
            <p>Every effort, whether that is protecting our forests, taking the bus to work, or fixing leaks in our houses, makes a difference.</p>
        </div>
        <img src="trees.png" alt="trees"/>
      </section>

      <section class="text-left">
        <div>
            <p>Though our individual impacts may be small, they adds up. Track the changes in CO2 emissions when we save water, fuel, and trees.</p>
        </div>
        <img src="faucet.png" alt="dripping faucet"/>
      </section>
      <section>
        <h1>Let's reimagine a lifestyle that preserves our planet</h1>
      </section>
    </div>
  );
};

export default Home;
