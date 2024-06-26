import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../css/Hero.css";
import img1 from "../assets/images/Frame 1171276215.png";
import img2 from "../assets/images/Frame 1171276214.png";
import img3 from "../assets/images/Frame 1171276219.png";
import img4 from "../assets/images/Frame 1171276220.png";
import cusIcon from "../assets/icons/Customer service.png";
import cardIcon from "../assets/icons/Online payment.png";
import badgeIcon from "../assets/icons/Badge.png";
import { Link } from "react-router-dom";

function Hero() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="hero">
      <Carousel
        className="main-pb"
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
      >
        <Carousel.Item className="">
          <div className="img-pb">
            <img src={img3} text="First slide" width="100%" height="450px" />
          </div>
          <div className="main-b">
            <Carousel.Caption>
              <div className="text-body1">
                <h1>Classic Elegance</h1>
                <p className="hero-p d-flex flex-column">
                  Discover timeless fragrances that exude sophistication and
                  charm.
                  <Link to="/all-fragrances" className="shop-btn">
                    <button className="btn btn-dark py-2  w-100">
                      Shop Now
                    </button>
                  </Link>
                </p>
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="img-pb">
            <img src={img2} text="Second slide" width="100%" height="450px" />
          </div>

          <Carousel.Caption>
            <div className="text-body2">
              <h1>Sensual & Seductive</h1>
              <p className="hero-p d-flex flex-column">
                Delve into alluring scents that ignite passion and intrigue.
                <Link to="/all-fragrances" className="shop-btn">
                  <button className="btn btn-dark py-2  w-100">
                    Shop Now
                  </button>
                </Link>
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="img-pb">
            <img src={img3} text="Third slide" width="100%" height="450px" />
          </div>

          <Carousel.Caption>
            <div className="text-body3">
              <h1>Fresh & Crisp</h1>
              <p className="hero-p d-flex flex-column">
                Experience invigorating fragrances that captures the essence of
                pure freshness.
                <Link to="/all-fragrances" className="shop-btn">
                  <button className="btn btn-dark  py-2  w-100">
                    Shop Now
                  </button>
                </Link>
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="img-pb">
            <img src={img4} text="Fourth slide" width="100%" height="450px" />
          </div>

          <Carousel.Caption>
            <div className="text-body4">
              <h1>Modern Chic</h1>
              <p className="hero-p d-flex flex-column">
                Uncover contemporary scents designed for the trendsetter in you.
                <Link to="/all-fragrances" className="shop-btn">
                  <button className="btn btn-dark py-2  w-100">
                    Shop Now
                  </button>
                </Link>
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="section-b">
        <div className="texts">
          <div className="text py-3">
            <img src={badgeIcon} alt="" />
            <p>100% Authentic Fragrance</p>
          </div>
          <div className="text">
            <img src={cardIcon} alt="" />
            <p>Secure & Safe Payment</p>
          </div>
          <div className="text">
            <img src={cusIcon} alt="" />
            <p>Top-notch Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
