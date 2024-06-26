import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "../css/DetailCards.css";
import Star from "../assets/images/Vector star.png";
import StarHalf from "../assets/icons/icons8-star-half-48.png";
import Plus from "../assets/images/ic_sharp-plus.png";
import Minus from "../assets/images/ic_sharp-minus.png";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../contexts/Cart";
import { BsFillCartCheckFill } from "react-icons/bs";

const DetailCard = ({ product }) => {
  const { addToCart, cart, increaseQty, decreaseQty } = useCart();

  const { productId } = useParams();
  const {
    name,
    description,
    images,
    price,
    quantity,
    isAvailable,
    avgRating,
    size,
  } = product;

  let Price = price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });

  const [selectedImage, setSelectedImage] = useState(images[0]?.url);

  useEffect(() => {
    // Set the selected image to the first image in the array when component mounts
    setSelectedImage(images[0]?.url);
  }, [images]);

  const [count, setCount] = useState(1);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleIncrease = () => {
    setCount(count + 1);
    increaseQty(product._id);
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
      decreaseQty(product._id);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  let starRating;
  if (avgRating) {
    const fullStars = Math.floor(avgRating);
    const halfStar = avgRating - fullStars >= 0.5;
    starRating = Array.from({ length: fullStars }, (_, index) => (
      <img key={index} src={Star} alt="Star" />
    ));
    if (halfStar)
      starRating.push(<img key="half" src={StarHalf} alt="Half Star" />);
  } else {
    starRating = <span style={{ fontSize: "1.1rem" }}>No rating</span>;
  }

  const isAdded = cart.some((item) => item._id === product._id && item.isAdded);
  const addedQty = cart.find((item) => item._id === product._id)?.addedQty || 0;

  return (
    <>
      <div className="productDetail">
        <div className="productCont">
          <div className="productImg">
            <div className="selectImg">
              {/* Loop through images and show the selected image */}
              {images.length > 0 &&
                images.map((image, index) => (
                  <div
                    key={index}
                    className={`simg ${
                      selectedImage === image?.url ? "selected" : ""
                    }`}
                  >
                    <img
                      src={image?.url}
                      alt={image?.imagePubilicId}
                      onClick={() => handleImageClick(image?.url)}
                    />
                  </div>
                ))}
            </div>
            <div className="clickedImg">
              <img
                src={selectedImage || product?.images[0]?.url}
                alt={
                  selectedImage === product?.images[0]?.url ? "selected" : ""
                }
                className="selected"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </div>
          <div className="productInfo p-3">
            <h1 className="hG">{name}</h1>
            <p style={{ fontSize: "1.13rem", fontWeight: "400" }}>
              {description}
            </p>

            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="imgG d-flex gap-1" style={{ width: "5rem" }}>
                {starRating}
              </span>

              <span
                style={{
                  fontSize: "1.13rem",
                  fontWeight: "300",
                  marginLeft: "1.25rem",
                }}
              >
                {avgRating !== 0 ? (
                  <>
                    {avgRating} (
                    <span style={{ fontSize: "1.13rem" }}>40 Reviews</span>)
                  </>
                ) : (
                  <>
                    {avgRating} (
                    <span style={{ fontSize: "1.13rem" }}>No Review</span>)
                  </>
                )}
              </span>
            </div>
            <p className="my-2" style={{ fontSize: "1.25rem" }}>
              Price:{" "}
              <span
                className=""
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "500",
                  marginLeft: "1.2rem",
                }}
              >
                &#x20A6;{Price}
              </span>
            </p>
            <p className="mb-2" style={{ fontSize: "1.25rem" }}>
              Size:{" "}
              <button
                className="bg-light text-dark border border-dark btn-sm"
                style={{
                  width: "3rem",
                  height: "2rem",
                  fontSize: "1rem",
                  fontWeight: "500",
                  borderRadius: "4px",
                  marginLeft: "1.2rem",
                }}
              >
                {size} Oz
              </button>
            </p>

            <div className="d-flex my-2 align-items-center">
              <span className="pe-4" style={{ fontSize: "1.25rem" }}>
                Quantity:
              </span>
              <button
                className="btn1 bg-transparent rounded-0 rounded-start"
                onClick={handleDecrease}
              >
                <img src={Minus} alt="Decrease" />
              </button>
              <Button className="btnGg rounded-0 bg-transparent text-dark fw-bold ">
                {count}
              </Button>
              <button
                className="btn1 bg-transparent rounded-0 rounded-end"
                onClick={handleIncrease}
              >
                <img src={Plus} alt="Increase" />
              </button>
            </div>

            <div className="d-flex gap-2">
              <p style={{ fontSize: "1.25rem" }}>Availability:</p>
              <ul
                className="d-flex"
                style={{ listStyle: "none", paddingLeft: "1rem" }}
              >
                <li
                  style={{
                    color: isAvailable ? "#009320" : "#E70000",
                    fontWeight: "500",
                    fontSize: "1.13rem",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: isAvailable ? "#009320" : "#E70000",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "5px",
                    }}
                  ></span>
                  {isAvailable ? `In Stock (${quantity})` : "Out of Stock"}
                </li>
              </ul>
            </div>

            <div className="d-flex flex-column">
              {isAvailable ? (
                <Link to="/cart">
                  <Button
                    variant="dark"
                    className="buttonG mb-3"
                    style={{ backgroundColor: "black", fontSize: "20px" }}
                  >
                    Buy Now
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="dark"
                  className="buttonG mb-3"
                  style={{ backgroundColor: "gray", fontSize: "20px" }}
                  disabled
                >
                  Sold Out
                </Button>
              )}

              <Button
                variant="light"
                // className="buttonG border border-dark"
                className={
                  isAdded ? `bg-secondary text-light p-3` : "buttonG border border-dark p-3"
                }
                onClick={handleAddToCart}
                disabled={isAdded}
              >
                {isAdded ? `Added to cart ` : "Add to cart"}
                {isAdded && <BsFillCartCheckFill />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCard;
