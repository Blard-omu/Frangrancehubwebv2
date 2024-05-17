import React, { useState, useEffect } from "react";
import "../css/Countdown.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCardLoading from "./ProductCardLoadingM";
import "../css/AllfragranceComponent.css";
import { useCart } from "../contexts/Cart";
import { BsFillCartCheckFill } from "react-icons/bs";

const NewArrivalComponent = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState();

  const { addToCart, cart } = useCart();

  // Detecting device screen width
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  // Setting the limit for related products
  const limit = isMobile ? 4 : 4 && isTablet ? 6 : 4;
  const limitLoading = isMobile ? 2 : 4 && isTablet ? 3 : 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/product/all?page=1&limit=${limit}`);
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

  const newArrival = product;

  const handleAddToCart = (product) => (event) => {
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <>
      <section className="home-all-fragrance">
        <div className="home-all-fragrance-header">
          <span>New Arrival</span>
          <span>
            <Link style={{ textDecoration: "none" }} to="/new-arrivals">
              View all <FaArrowRightLong />
            </Link>
          </span>
        </div>
        <div className="best-seller-product">
          {loading
            ? Array.from({ length: limitLoading }).map((_, index) => (
                <ProductCardLoading key={index} />
              ))
            : newArrival?.map((product) => {
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
                    <div className="m-card-Container" key={_id}>
                      <div className="m-image">
                        <Link className="" to={`/detail/${product._id}`}>
                          <img src={images[0].url} alt={name} />
                        </Link>
                      </div>
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

export default NewArrivalComponent;
