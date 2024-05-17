import React, { useState, useEffect } from "react";
import "../css/Countdown.css";
import flash from "../assets/icons/flash logo.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCardLoading from "./ProductCardLoadingM";
import { useCart } from "../contexts/Cart";
import { BsFillCartCheckFill } from "react-icons/bs";

const CountDownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState();
  const { cart, addToCart } = useCart();

  function calculateTimeRemaining() {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(24, 0, 0, 0);

    const timeDiff = endOfDay.getTime() - now.getTime();

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/product/all`);
        setProduct(response?.data?.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
      // console.log(product);
    };
    fetchData();
  }, []);

  const flashProduct = product?.slice(4, 8);

  const handleAddToCart = (product) => (event) => {
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <>
      <section className="flash-conatinerM">
        <div className="flash-header">
          <div className="left-flashM">
            <img src={flash} alt="flash" />
            <span>Flash Sale</span>
          </div>
          <span>
            Time Left:{" "}
            {`${timeRemaining.hours}h : ${timeRemaining.minutes}m : ${timeRemaining.seconds}s`}
          </span>
          <span>
            View all <FaArrowRightLong />
          </span>
        </div>
        <div className="flash-product">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProductCardLoading key={index} />
              ))
            : flashProduct.map((product) => {
                const { _id, images, name, description, price, isAvailable } =
                  product;
                let Price = price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                });
                const isAdded = cart.some(
                  (item) => item._id === _id && item.isAdded
                );
                return (
                  <>
                    <div
                      className="m-card-Container discount-relative"
                      key={_id}
                    >
                      <div className="m-image">
                        <Link className="" to={`/detail/${product._id}`}>
                          <img src={images[0].url} alt={name} />
                        </Link>
                      </div>
                      <p className="discount">-20%</p>
                      <div className="m-card-info">
                        <Link
                          className="text-decoration-none"
                          to={`/detail/${product._id}`}
                        >
                          <div className="m-card-text">
                            <h4>{name}</h4>
                            <p>{description}</p>
                            <h2>&#x20A6;{Price}</h2>
                          </div>
                        </Link>
                        <div className="m-card-btn">
                          {isAvailable ? (
                            <button
                              className={
                                isAdded ? `bg-secondary text-light` : ""
                              }
                              onClick={handleAddToCart(product)}
                              disabled={isAdded}
                            >
                              {isAdded ? `Added ` : "Add to cart"}{" "}
                              {isAdded && <BsFillCartCheckFill />}
                            </button>
                          ) : (
                            <button className="not-ava" disabled>
                              Sold Out
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
        </div>
      </section>
    </>
  );
};

export default CountDownTimer;
