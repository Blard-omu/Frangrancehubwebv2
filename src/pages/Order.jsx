import { FaCheckCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Menu from "../components/nav/NavBar";
import SideNav from "../components/nav/SideNav";
import { useAuth } from "../contexts/Auth";

const Order = () => {
const { auth } = useAuth();


  return (
    <>
      <Menu />
      <SideNav />
      <div className=" d-flex justify-content-center align-items-center top-10 z-2 w-100 pt-5 ">
        <FaCheckCircle
          size="10%"
          className="text-success  text-center text-md-start"
        />
      </div>

      <div className="d-flex flex-column justify-content-center  align-items-center top-10 z-2 w-100 ">
        <h3 className="fw-bold text-center text-md-start">
          YOUR ORDER HAS BEEN RECEIVED
        </h3>
        <p className="fs-4">Thank You For placing an Order</p>
        <p className="fs-6"> Order no: 12345678</p>
        <div className="d-flex gap-3 justify-content-center">
          <Link to={auth?.user?.role === 1 ? "/dashboard/admin/orders" : "/dashboard/user/orders"} style={{ textDecoration: "none" }}>
            <Button
              variant="outline-secondary bg-dark text-white border-rounded"
              onClick={() => scroll("right")}
            >
              see order details
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Order;
