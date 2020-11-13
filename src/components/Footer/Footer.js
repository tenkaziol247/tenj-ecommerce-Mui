import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";
import Logo from "../Image/Logo/Logo";
import payments from "../../assets/images/payments.png";

export default function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer__above">
        <div className="footer__above__item">
          <div className="footer__above__logo">
            <Logo width="100%" />
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos est
            quos animi nam culpa odio repellendus dicta fuga commodi
          </p>
          <div className="footer__above__contact">
            <div className="footer__above__contact__symbolPhone">
              <i className="fa fa-phone"></i>
            </div>
            <div className="footer__above__contact__text">
              <p>Got Question? Call us 24/7</p>
              <h4>+84 150 825 08</h4>
            </div>
          </div>
        </div>
        <div className="footer__above__item">
          <h5>Useful Links</h5>
          <ul>
            <li>
              <Link to="/list">Our Services</Link>
            </li>
            <li>
              <Link to="/list">How to shop on TenJ</Link>
            </li>
            <li>
              <Link to="/list">FAQ</Link>
            </li>
            <li>
              {" "}
              <Link to="/list">Contact us</Link>
            </li>
          </ul>
        </div>
        <div className="footer__above__item">
          <h5>Customer Service</h5>
          <ul>
            <li>
              <Link to="/list">Payment Methods</Link>
            </li>
            <li>
              <Link to="/list">Money-back guarantee!</Link>
            </li>
            <li>
              <Link to="/list">Return</Link>
            </li>
            <li>
              <Link to="/list">Shipping</Link>
            </li>
            <li>
              <Link to="/list">Terms and conditions</Link>
            </li>
            <li>
              <Link to="/list">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="footer__above__item">
          <h5>Authentication</h5>
          <ul>
            <li>
              <Link to="/auth">Sign In</Link>
            </li>
            <li>
              <Link to="/cart">View Cart</Link>
            </li>
            <li>
              <Link to="/order">Track My Order</Link>
            </li>
            <li>
              <Link to="/list">Help</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__below">
        <p className="footer__copyright">
          Copyright &copy; 2020 TenJ Store. All Rights Reserved.
        </p>
        <div className="footer__payments">
          <img src={payments} alt="payment" />
        </div>
      </div>
    </footer>
  );
}
