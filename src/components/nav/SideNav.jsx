import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import hamburger from "../../assets/icons/ham.png";
import Logo from "../../assets/icons/Frame 579 (0).png";
import "../../css/SideBar.css";
import Humani from "../../assets/icons/person.png";
import Carti from "../../assets/icons/cart.png";
import FragLogo from "../../assets/images/Frame 579.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import Dropdown from "react-bootstrap/Dropdown";
import HandleShow from "../HandleShow";

function SideNav({ name, ...props }) {
  const [show, setShow] = useState(false);
  const { auth, login, logout } = useAuth();
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="side-top">
      <div className="off-body sticky-top">
        <div className="upNav " style={{ color: "white" }}>
          <div className="left-nav">
            <img src={hamburger} alt="" onClick={handleShow} />

            <Link to="/" className="logs">
              <img src={Logo} alt="" className="logoimg" />
            </Link>
          </div>

          <div className="right-icons">
           <HandleShow/>

            {!auth?.user ? (
              <Link to="/login">
                <img src={Humani} alt="" />
              </Link>
            ) : (
              <Link
                to={
                  auth?.user.role === 1 ? "/dashboard/admin" : "/dashboard/user"
                }
              >
                <img src={Humani} alt="" />
              </Link>
            )}

            <Link to="/cart">
              <div className="cartiee">
              <img src={Carti} alt="" />
              </div>
            </Link>
            <div className="cartcount-s">0</div>
          </div>
        </div>
      </div>

      <Offcanvas className="w-75" show={show} onHide={handleClose}>
        <div className="show-header ">
          <div className="left-logo">
            <Offcanvas.Header
              closeButton
              className="off-header"
            ></Offcanvas.Header>
            <img src={FragLogo} alt="" />
          </div>
        </div>
        <Offcanvas.Body className="off-main">
          <div className="">
            <ul className="first-li">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <li>Home</li>
              </Link>

              <Link
                to="/all-fragrances"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li>All Fragrance</li>
              </Link>

              <Link
                to="/new-arrivals"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li>New Arrival</li>
              </Link>

              <Link to="/blog" style={{ textDecoration: "none", color: "white" }}>
                <li>Blogs</li>
              </Link>

              <Link to="/contact" style={{ textDecoration: "none", color: "white" }}>
                <li>Contact Us</li>
              </Link>
            </ul>
          </div>

          <div className="straight-line"></div>

          <div>
            <ul className="last-li">
              <Dropdown>
                <Dropdown.Toggle
                  variant="none"
                  id="dropdown-basic"
                  className="text-light"
                  size="lg"
                >
                  My Account
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {auth.user ? (
                    <div>
                      <Dropdown.Item>
                        <Link
                          to={
                            auth?.user.role === 1
                              ? "/dashboard/admin"
                              : "/dashboard/user"
                          }
                          className="text-decoration-none text-dark"
                        >
                          Dashboard
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </div>
                  ) : (
                    <div>
                      <Dropdown.Item>
                        <Link
                          to="/signup"
                          className="text-decoration-none text-dark"
                        >
                          Sign Up
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link
                          to="/login"
                          className="text-decoration-none text-dark"
                        >
                          Login
                        </Link>
                      </Dropdown.Item>
                    </div>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <li>Help</li>
              </Link>

              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <li>FAG</li>
              </Link>

              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <li>Shipping Information</li>
              </Link>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* </div> */}
    </div>
  );
}

export default SideNav;
