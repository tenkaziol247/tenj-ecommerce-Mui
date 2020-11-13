import React from "react";

import "./Services.scss";

export default function Services(props) {
  return (
    <section className="services">
      <div className="services__item">
        <div className="services__symbol">
          <i className="fa fa-rocket"></i>
        </div>
        <div className="services__context">
          <h5>Free Shipping</h5>
          <p>Orders $50 or more</p>
        </div>
      </div>
      <div className="services__item">
        <div className="services__symbol">
          <i className="fa fa-undo"></i>
        </div>
        <div className="services__context">
          <h5>Free Returns</h5>
          <p>Within 30 days</p>
        </div>
      </div>
      <div className="services__item">
        <div className="services__symbol">
          <i className="fa fa-exclamation-circle"></i>
        </div>
        <div className="services__context">
          <h5>Get 20% Off 1 Item</h5>
          <p>When you sign up</p>
        </div>
      </div>
      <div className="services__item">
        <div className="services__symbol">
          <i className="fa fa-life-ring"></i>
        </div>
        <div className="services__context">
          <h5>We Support</h5>
          <p>24/7 amazing services</p>
        </div>
      </div>
    </section>
  );
}
