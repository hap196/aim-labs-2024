import React from "react";
import abhay from "./images/abhay.jpg";
import leann from "./images/leann.jpg";
import hailey from "./images/hailey.jpg";
import isabella from "./images/isabella.jpg";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <h2 className="about-title">About SneakIn</h2>
      <h3 className="about-subtitle">About the Sneaker Resale Market</h3>
      <p>
        Limited edition and luxury sneaker price and demand fluctuates so
        greatly that the sneaker resale industry is often considered a stock
        market. It is extremely difficult to predict
      </p>
      <h3 className="about-subtitle">What SneakIn Does</h3>
      <p>
        SneakIn is an interactive webapp where users can input sneaker details
        and predict the shoe's current and future sales prices to help make
        informed decisions for favorable purchases and profitable transactions.
      </p>

      <h3 className="about-subtitle">Development</h3>
      <p>
        SneakIn was created by four MIT undergraduates for the 2024 Spring
        AI@MIT Labs Cohort. Check out the Github repository{" "}
        <a
          href="https://github.com/hap196/aim-labs-2024/tree/main"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        !
      </p>

      <div className="team-members">
        <div>
          <img src={abhay} alt="Abhay Basireddy" />
          <p>Abhay Basireddy</p>
        </div>
        <div>
          <img src={hailey} alt="Hailey Pan" />
          <p>Hailey Pan</p>
        </div>
        <div>
          <img src={leann} alt="LeAnn Tai" />
          <p>LeAnn Tai</p>
        </div>
        <div>
          <img src={isabella} alt="Isabella Zhu" />
          <p>Isabella Zhu</p>
        </div>
      </div>
    </div>
  );
};
export default About;
