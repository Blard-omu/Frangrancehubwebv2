import "../css/CartItems.css";
import { useEffect } from "react";
import { useCart } from "../contexts/Cart";
import { ImBin2 } from "react-icons/im";
import Menu from "../components/nav/NavBar";
import SideNav from "../components/nav/SideNav";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import CartEmpty from "../pages/Chart";
import { useAuth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const { cart, cartSubTotal, removeFromCart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Cart Items:", cart);
  // }, [cart]);

  return (
    <>
      <Menu />
      <SideNav />
      {cart.length > 0 ? (
        <div
          className=" container-fluid"
          style={{ marginTop: "1rem", marginBottom: "2rem" }}
        >
          <div className="row">
            <div className=" col-md-8 ">
              {cart.map((item) => (
                <div className="card-kc shadow" key={item._id}>
                  <div className="img-card-kc">
                    <div className="left-img-kc">
                      <div className="img-kc-kc">
                        <img src={item.images[0].url} alt={item.name} />
                      </div>
                      <div className="text-card-kc">
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                        <p className="stock-kc">
                          {item.isAvailable ? "In stock" : "Out of stock"}
                        </p>
                      </div>
                    </div>
                    <div className="btn-kc">
                      <h4>&#8358;{item.price}</h4>
                    </div>
                  </div>
                  <div className="del-items">
                    <div className="r" onClick={() => removeFromCart(item._id)}>
                      <ImBin2 />
                      Remove item
                    </div>
                    <div className="add-btn-kc">
                      <button className="btn-kc-kc">-</button>
                      <span>
                        <b>0</b>
                      </span>
                      <button className="btn-kc-kcee">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <div className="kc-card">
                <div className="sum">
                  <h4>Cart Summary</h4>
                </div>
                <div className="total">
                  <div className="tot">
                    <h5>Subtotal</h5>
                    <h4>&#8358;{cartSubTotal()}</h4>
                  </div>
                  <div className="delivery">
                    <p>Delivery Fees not included yet.</p>
                  </div>
                  <div></div>
                </div>
                <div className="text-center">
                  {auth?.token ? (
                    <button className="btn btn-dark w-100 p-3 mt-2">
                      <Link
                        className="text-decoration-none text-light"
                        to="/checkout"
                      >
                        Checkout Now
                      </Link>
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning mt-3 w-50 p-3"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Login to checkout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
      <Footer />
    </>
  );
};

export default CartItems;
