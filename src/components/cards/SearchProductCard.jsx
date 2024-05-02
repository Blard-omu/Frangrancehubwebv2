import React from "react";
import "../../css/ProductM.css";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/Cart";


const SearchProductCard = ({ product }) => {
  const { name, description, price, images, isAvailable, _id } = product;
  const { addToCart, cart } = useCart();

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <div key={_id}>
      <div className="m-card-Container" key={_id}>
        <div className="m-image">
          <Link className="" to={`/detail/${product._id}`}>
            <img src={images ? images[0]?.url : null} />
          </Link>
        </div>

        <div className="m-card-info">
          <Link className="text-decoration-none" to={`/detail/${product._id}`}>
            <div className="m-card-text">
              <h4>{name}</h4>
              <p>{description}</p>
              <h2>&#x20A6;{price}</h2>
            </div>
          </Link>

          <Link to={`/cart/${product._id}`}>
            <div className="m-card-btn">
              {isAvailable ? (
                <button onClick={handleAddToCart}>Add to cart</button>
              ) : (
                <button className="not-ava" disabled>
                  Sold Out
                </button>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchProductCard;
