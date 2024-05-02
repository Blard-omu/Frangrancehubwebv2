import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const RecentlyViewed = ({limit}) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  useEffect(() => {
    // Retrieve the list of recently viewed product IDs from local storage
    const recentlyViewedIds = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    // Fetch details of each recently viewed product
    const fetchRecentlyViewedProducts = async () => {
      const promises = recentlyViewedIds.map(productId => axios.get(`/product/${productId}`));
      try {
        const responses = await Promise.all(promises);
        // Extract the product data from the responses
        const products = responses.map(response => response.data.product);
        setRecentlyViewed(products);
      } catch (error) {
        console.error("Error fetching recently viewed products:", error);
      }
    };

    fetchRecentlyViewedProducts();
  }, []);
   // Limit the number of recently viewed products displayed based on screen size
   let limitedRecentlyViewed = [];
   if (window.innerWidth < 1024) {
     limitedRecentlyViewed = recentlyViewed.slice(0, limit);
   } else {
     limitedRecentlyViewed = recentlyViewed.slice(0, limit / 2);
   }
 console.log(recentlyViewed);
  return (
    <div className="mb-4 mt-4" >
      <div className="">
      <h2>Recently Viewed</h2>
      </div>
      <div className="rpG d-flex justify-content-start gap-4 border border-0 p-1" >
        {limitedRecentlyViewed.map(product => (
          <Link className="link" to={`/detail/${product._id}`}>
          <div key={product._id}>
            <div className="m-card-Container mt-lg-4" key={product._id} >
              <div className="m-image">
                <img src={product.images[0].url} alt={product.name} />
              </div>
              <div className="m-card-info">
                <div className="m-card-text">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <h2>&#x20A6;{product.price}</h2>
                </div>
                <div className="m-card-btn pb-2">
                  {product.isAvailable ? (
                    <button className="">Add to cart</button>
                  ) : (
                    <button className="not-ava" disabled>
                      Sold Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
