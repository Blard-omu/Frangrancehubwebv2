import React from "react";
import order from "../assets/images/order.png";
import "../css/Chart.css";
import { Link } from "react-router-dom";
import RecentlyViewed from "../components/RecentlyViewed";
import CountDownTimer from "../components/CountDownTimer";
const CartEmpty = () => {
  return (
    <>
      <div className="cart-container">
        <>
          <div className="cart">
            <img src={order} />
          </div>
          <div className="Empty">
            <h2>Your Cart is Empty</h2>
            <p>Browse all categories and discover our new arrival</p>
          </div>
          <div className="button">
            <Link
              className="button2 text-light text-decoration-none text-center"
              to="/all-fragrances"
            >
              Start Shopping
            </Link>
          </div>
        </>
      </div>
      <div className="recently">
        <RecentlyViewed limit={8} />
      </div>
      <div className="">
        <CountDownTimer />
      </div>
    </>
  );
};

export default CartEmpty;
