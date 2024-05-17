import React from "react";
import "../css/ProductM.css";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/Cart";
import { BsFillCartCheckFill } from "react-icons/bs";

const ProductCard = ({ product }) => {
  const { _id, images, name, description, price, isAvailable } = product;
  const { addToCart, cart } = useCart();

  let Price = price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(product);
  };

  const isAdded = cart.some((item) => item._id === _id && item.isAdded);

  return (
    <div key={_id}>
      <div className="m-card-Container" key={_id}>
        <div className="m-image">
          <Link className="" to={`/detail/${product._id}`}>
            <img src={images[0].url} alt={name} />
          </Link>
        </div>
        <div className="m-card-info">
          <Link className="text-decoration-none" to={`/detail/${product._id}`}>
            <div className="m-card-text">
              <h4>{name}</h4>
              <p>{description}</p>
              <h2>&#x20A6;{Price}</h2>
            </div>
          </Link>
          <div className="m-card-btn">
            {isAvailable ? (
              <button
                className={isAdded ? `bg-secondary text-light` : ""}
                onClick={handleAddToCart}
                disabled={isAdded}
              >
                {isAdded ? `Added ` : "Add to cart"}
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
  );
};

export default ProductCard;
