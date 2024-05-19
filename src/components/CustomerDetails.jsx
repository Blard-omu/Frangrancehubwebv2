import React, { useState } from "react";
import "../css/CustomerDetails.css";
import visa from "../assets/icons/visa.png";
import paypal from "../assets/icons/paypal.png";
import master from "../assets/icons/master.png";
import { useCart } from "../contexts/Cart";
import Menu from "../components/nav/NavBar";
import SideNav from "../components/nav/SideNav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ImBin2 } from "react-icons/im";
import RecentlyViewed from "./RecentlyViewed";
import CountDownTimer from "./CountDownTimer";

const CustomerDetails = () => {
  const { cart, cartSubTotal, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState();

  const itemsIncart = cart.length ? cart.length : 0;
  const shipping = cart.length > 0 && cartSubTotal() < 300000 ? 2000 : 0;
  const total = cart.length > 0 ? cartSubTotal() + shipping : 0;
  const paymentRef = true;
  const cartItems = cart.filter((item) => item._id);

  const handlePay = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/product/payment", {
        paymentRef,
        cartItems,
      });

      if (data.success) {
        console.log("Order created");
        toast.success("Order created successfully");
        localStorage.removeItem("cart");
        navigate("/order");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Error creating order");
    }
  };

  return (
    <>
      <div className="buni">
        <div className="text-dark p-1 bg-light mb-1">
          <h3>Customer Details</h3>
        </div>

        <div className="cus-detail d-flex justify-content-between flex-column flex-md-row w-100">
          <div className="det-form row">
            <div className="col-12 col-md-6">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
              />
            </div>
            <div className="col-12 col-md-6">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
              />
            </div>

            <div className="col-12 col-md-6">
              <label>Phone Number</label>
              <input type="text" className="form-control" placeholder="+234" />
            </div>
            <div className="col-12 col-md-6 my-2">
              <label>Phone 2 (Optional)</label>
              <input type="text" className="form-control" placeholder="+234" />
            </div>
            <div className="col-12 my-2">
              <label>Delivery Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email address"
              />
            </div>
            <div className=" d-flex flex-column">
              <label>Region</label>
              <select className="form-select" id="region">
                <option value="">Select Region</option>
                <option value="">Africa</option>
                <option value="">Asia</option>
                <option value="">Europe</option>
              </select>
            </div>
            <div className=" d-flex flex-column my-2">
              <label>City</label>
              <select className="form-select" id="city">
                <option value="">Select City</option>
                <option value="LAGOS">Lagos</option>
                <option value="IBADAN">IBADAN</option>
                <option value="">PORTHARCOURT</option>
              </select>
            </div>

            {/* Delivery Options */}
            <div className="case-2 mt-4">
              <div className="heading">
                <h3 className="text-dark">Delivery Options</h3>
              </div>
              <div className="details">
                <div className="delivery p-1">
                  <input type="radio" name="door" value="Door Delivery" />
                  <span className="ms-2">Door Delivery</span>
                </div>
                <div className="pick p-1">
                  <input type="radio" name="door" value="Pick up" />{" "}
                  <span className="ms-2">Pick up</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="case-3 mt-4">
              <div className="heading">
                <h3 className="text-dark">Select Payment Method</h3>
              </div>
              <div className="d-flex justify-content-between align-items-center col-12 col-md-6">
                <div className="d-flex align-items-center w-100">
                  <input type="radio" name="card" value="Pick up" />{" "}
                  <span className="ms-2">Pay With Paypal</span>
                </div>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "20px", height: "20px" }}
                >
                  <img src={paypal} alt="" className="w-100" />
                </div>
              </div>

              <div className="icon-1 w-100 d-flex justify-content-between align-items-center">
                <div className="credit-card">
                  <input type="radio" name="card" value="Door Delivery" />
                  <span className="ms-2">Pay With Credit Card</span>
                </div>
                <div className="d-flex justify-content-around justify-content-between align-items-center">
                  <div className="" style={{ width: "30px", height: "30px" }}>
                    <img src={visa} alt="" className="w-100" />
                  </div>
                  <div className="" style={{ width: "30px", height: "30px" }}>
                    <img src={master} alt="" className="w-100" />
                  </div>
                </div>
              </div>

              <div className="payment-form row mb-2 p-0 ">
                <div className="col-12 col-lg-6">
                  <label>Name On Card</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name on Card"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label>Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your card number"
                  />
                </div>
                <div className="col-12 col-md-6 my-2">
                  <label>Expiring Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="DD/MM/YY"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label>CVV</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
            </div>
          </div>

          <div className="summary1">
            {/* Items desktop */}
            <div className=" d-none d-md-block w-100">
              <h3 className="bg-light">Total Items({itemsIncart})</h3>
              <div className="w-100">
                <table className="table table-hover w-100">
                  <tbody>
                    {cart?.length > 0 &&
                      cart.map((product) => (
                        <tr className="" key={product._id}>
                          <td>
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              style={{ width: "60px", height: "60px" }}
                            />
                          </td>
                          <td>{product.name.slice(0, 20)}..</td>
                          <td>
                            &#8358;{product.price.toLocaleString()}{" "}
                            <small className="text-secondary">
                              {" "}
                              x {product.addedQty}
                            </small>
                          </td>{" "}
                          <td>
                            <span
                              className="text-danger p-1"
                              onClick={() => removeFromCart(product._id)}
                              style={{ fontSize: "1rem" }}
                            >
                              <ImBin2 />
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="id-1 mt-4">
                <p>
                  Subtotal <b> &#8358;{cartSubTotal()}</b>
                </p>
                <p>
                  Shipping fee <b>&#8358; {shipping}</b>
                </p>
              </div>
              <div className="id-2">
                <p>
                  Total <b>&#8358;{total}</b>
                </p>
              </div>
              <div className="firm">
                <button
                  to="/order"
                  className="btn btn-dark w-50"
                  onClick={handlePay}
                >
                  {loading ? "Loading..." : "Confirm Order"}
                </button>
                <h6>(complete the steps in order to proceed)</h6>
              </div>
            </div>

            {/* Items mobile */}
            <div className="d-md-none w-100">
              <h3 className="bg-light">Total Items({itemsIncart})</h3>
              <div className="w-100">
                <table className="table table-hover w-100">
                  <tbody>
                    {cart?.length > 0 &&
                      cart.map((product) => (
                        <tr className="" key={product._id}>
                          <td>
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              style={{ width: "30px", height: "30px" }}
                            />
                          </td>
                          <td style={{ fontSize: ".6em" }}>
                            {product.name.slice(0, 20)}..
                          </td>
                          <td>
                            &#8358;{product.price.toLocaleString()}{" "}
                            <small className="text-secondary">
                              {" "}
                              x {product.addedQty}
                            </small>
                          </td>
                          <td>
                            <span
                              className="text-danger p-1"
                              onClick={() => removeFromCart(product._id)}
                              style={{ fontSize: "1rem" }}
                            >
                              <ImBin2 />
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="id-1 mt-4">
                <p>
                  Subtotal <b> &#8358;{cartSubTotal()}</b>
                </p>
                <p>
                  Shipping fee <b>&#8358; {shipping}</b>
                </p>
              </div>
              <div className="id-2">
                <p>
                  Total <b>&#8358;{total}</b>
                </p>
              </div>
              <div className="firm">
                <button
                  to="/order"
                  className="btn btn-dark w-50"
                  onClick={handlePay}
                >
                  {loading ? "Loading..." : "Confirm Order"}
                </button>
                <h6>(complete the steps in order to proceed)</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="recently">
          <RecentlyViewed limit={8} />
        </div>
        <div className="">
          <CountDownTimer />
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
