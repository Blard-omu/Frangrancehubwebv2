import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/Cart";
import { BsFillCartCheckFill } from "react-icons/bs";

const RecentlyViewed = ({ limit }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const { addToCart, cart } = useCart(); // Use the addToCart function and cart from the context

  useEffect(() => {
    const recentlyViewedIds =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    const fetchRecentlyViewedProducts = async () => {
      const promises = recentlyViewedIds.map((productId) =>
        axios.get(`/product/${productId}`)
      );
      try {
        const responses = await Promise.all(promises);
        // Extract the product data from the responses
        const products = responses.map((response) => response.data.product);
        setRecentlyViewed(products);
      } catch (error) {
        console.error("Error fetching recently viewed products:", error);
      }
    };

    fetchRecentlyViewedProducts();
  }, []);

  let limitedRecentlyViewed = [];
  if (window.innerWidth < 1024) {
    limitedRecentlyViewed = recentlyViewed.slice(0, limit);
  } else {
    limitedRecentlyViewed = recentlyViewed.slice(0, limit / 2);
  }

  const handleAddToCart = (event, product) => {
    event.stopPropagation(); // Prevent triggering the Link click event
    addToCart(product);
  };

  return (
    <div className="mb-4 mt-4">
      <div className="">
        <h2>Recently Viewed</h2>
      </div>
      <div className="rpG d-flex justify-content-start gap-4 border border-0 p-1">
        {limitedRecentlyViewed.map((product) => {
          const isAdded = cart.some(
            (item) => item._id === product._id && item.isAdded
          );

          return (
            <div className="link" key={`${product._id}-${product.name}`}>
              <div>
                <div
                  className="m-card-Container mt-lg-4"
                  key={`${product._id}-${product.name}`}
                >
                  <div className="m-image">
                    <Link to={`/detail/${product._id}`} key={product._id}>
                      <img src={product.images[0].url} alt={product.name} />
                    </Link>
                  </div>
                  <div className="m-card-info">
                    <div className="m-card-text">
                      <h4>{product.name}</h4>
                      <p>{product.description}</p>
                      <h2>
                        &#x20A6;
                        {product.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </h2>
                    </div>
                    <div className="m-card-btn pb-2">
                      {product.isAvailable ? (
                        <button
                          className={isAdded ? "bg-secondary text-light" : ""}
                          onClick={(event) => handleAddToCart(event, product)}
                          disabled={isAdded}
                        >
                          {isAdded ? "Added" : "Add to cart"}{" "}
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentlyViewed;
