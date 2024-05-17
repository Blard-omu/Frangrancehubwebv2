import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/RelatedProd.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/Cart";
import { BsFillCartCheckFill } from "react-icons/bs";

const RelatedProd = () => {
  const { productId } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart, cart } = useCart();

  // Detecting device screen width
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  // Setting the limit for related products
  const limit = isMobile ? 5 : 2 && isTablet ? 6 : 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/product/related/${productId}`);
        // console.log("Fetched data:", response.data);
        const shuffledProducts = shuffle(response.data.relatedProducts);
        setRelatedProducts(shuffledProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [productId]);

  // Fisher-Yates shuffle algorithm
  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  const handleAddToCart = (event, product) => {
    event.stopPropagation(); // Prevent triggering the Link click event
    addToCart(product);
  };

  return (
    <div className="rpB">
      <div className="rpg-container pb-lg-4">
        <div className="">
          <h3>Related Products</h3>
        </div>
        <div className="rpG rounded px-lg-4 pt-lg-4 d-flex flex-row flex-lg-column justify-content-md-between gap-2 ">
          {relatedProducts.slice(0, limit).map((product) => {
            const { _id, images, name, price, isAvailable } = product;
            let Price = price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
            const isAdded = cart.some(
              (item) => item._id === product._id && item.isAdded
            );

            return (
              <div className="link" key={`${product._id}-${product.name}`}>
                <div>
                  <div className="m-card-Container mt-lg-4">
                    <div className="m-image">
                      <Link
                        to={`/detail/${product._id}`}
                        key={`${product._id}-${product.name}`}
                      >
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
    </div>
  );
};

export default RelatedProd;
