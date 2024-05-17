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
import RecentlyViewed from "./RecentlyViewed";
import CountDownTimer from "./CountDownTimer";

const CartItems = () => {
  const { cart, cartSubTotal, removeFromCart, increaseQty, decreaseQty } =
    useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Menu />
      <SideNav />
      {cart?.length > 0 ? (
        <div
          className=" container-fluid"
          style={{ marginTop: "1rem", marginBottom: "2rem" }}
        >
          <div className="row">
            <div className=" col-md-8 ">
              <div className="sum bg-light">
                <h4>Cart {cart?.length > 1 ? "Items" : "Item"} ({cart?.length})</h4>
              </div>
              {cart &&
                cart.length > 0 &&
                cart.map((item) => (
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
                            {item.isAvailable ? "In stock" : "Out of stock"} (
                            {item.isAvailable && item.quantity})
                          </p>
                        </div>
                      </div>
                      <div className="btn-kc">
                        <h4>&#8358;{item.price} <small className="text-secondary" style={{fontSize: "0.8rem"}}>x {item.addedQty}</small></h4>
                      </div>
                    </div>
                    <div className="del-items">
                      <div
                        className="r text-danger"
                        onClick={() => removeFromCart(item._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <ImBin2 />
                        <span className="text-secondary ps-2">Remove item</span>
                      </div>
                      <div className="add-btn-kc">
                        <button
                          className="btn-kc-kc"
                          onClick={() => decreaseQty(item._id)}
                        >
                          -
                        </button>
                        <span>
                          <b>{item.addedQty ? item.addedQty : 0}</b>
                        </span>
                        <button
                          // className="btn-kc-kcee"
                          className={item.quantity === item.addedQty ? "opacity-50" : "btn-kc-kcee"}
                          onClick={() => increaseQty(item._id)}
                          disabled={item.quantity === item.addedQty}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-md-4 mt-5 mt-md-0">
              <div className="kc-card">
                <div className="sum bg-light">
                  <h4>Cart Summary</h4>
                </div>
                <div className="total">
                  <div className="tot">
                    <h5>Subtotal</h5>
                    <h4>&#8358;{cartSubTotal()}</h4>
                  </div>
                  <div className="delivery">
                    {cartSubTotal() < 300000 && (
                      <p>Shipping Fees not included yet.</p>
                    )}
                    {cartSubTotal() >= 300000 ? (
                      <small className="">
                      Hurray! you're now qualified for free shipping (Lagos only)
                      </small>
                    ) : (
                      <small className="bg-warning text-dark p-1 pb-1">
                        Free shipping for order above <b className="text-secondary">&#8358;300,000</b> (Lagos only)
                      </small>
                    )}
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
          <div className="recently">
            <RecentlyViewed limit={8} />
          </div>
          <div className="">
          <CountDownTimer/>
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
