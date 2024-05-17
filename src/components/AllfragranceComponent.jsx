import React, { useState, useEffect } from "react";
import "../css/Countdown.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCardLoading from "./ProductCardLoadingM";
import "../css/AllfragranceComponent.css";
import { useCart } from "../contexts/Cart";
import { BsFillCartCheckFill } from "react-icons/bs";

const AllfragranceComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart, cart } = useCart();

  // Detecting device screen width
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  // Setting the limit for related products
  const limit = isMobile ? 8 : isTablet ? 9 : 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/product/all?page=2&limit=${limit}`);
        setProducts(response?.data?.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [limit]);

  const handleAddToCart = (product) => (event) => {
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <>
      <section className="home-all-fragrance">
        <div className="container d-flex justify-content-between w-100 home-all-fragrance-header">
          <span>All Featured Fragrance</span>
          <span>
            <Link style={{ textDecoration: "none" }} to="/all-fragrances">
              View all <FaArrowRightLong />
            </Link>
          </span>
        </div>
        <div className="home-all-fragrnace-product">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProductCardLoading key={index} />
              ))
            : products?.map((product) => {
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
                      className="m-card-Container m-card-Container3"
                      key={_id}
                    >
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

export default AllfragranceComponent;
