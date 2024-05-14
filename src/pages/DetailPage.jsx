import React, { useEffect, useState } from "react";
import DetailCard from "../components/DetailCard";
import Accordions from "../components/AccordionG";
import RelatedProd from "../components/RelatedProd";
import YouTube from "../components/YouTube";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/DetailPage.css";
import Footer from "../components/Footer";
import SideNav from "../components/nav/SideNav";
import Menu from "../components/nav/NavBar";
import DetailCardLoading from "../components/DetailLoading";
import RecentlyViewed from "../components/RecentlyViewed";

const DetailPage = () => {
  const { productId } = useParams();
  const [productG, setProductG] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/product/${productId}`);
        // console.log("Fetched data:", response.data);
        setProductG(response.data.product);

        // Store the viewed product in local storage
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        if (!recentlyViewed.includes(productId)) {
          recentlyViewed.unshift(productId);
          const maxLength = window.innerWidth <= 1024 ? 8 : 4;
          const updatedList = recentlyViewed.slice(0, maxLength);
          localStorage.setItem('recentlyViewed', JSON.stringify(updatedList));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally{
        setLoading(false)
      }
    };
    fetchData();
  }, [productId]);

  return (
    <>
      <Menu />
      <SideNav />
      <div className="all-details d-flex flex-column justify-content-center ">
        <>
          <div className="mb-4 detail-card ">
            {loading ? (
              <DetailCardLoading />
            ) : productG && (

              <DetailCard product={productG} />
            )}
          </div>

          <div className="gaccrel d-flex  justify-content-between flex-column flex-lg-row ">
            <div className="row d-flex  justify-content-between accordion-detailG ">
              <Accordions className="" product={productG} />

              <div className="d-lg-block d-none youtube-g ">
                <YouTube />
              </div>
            </div>

            <div className="d-flex justify-content-center relate-p">
              <RelatedProd />
            </div>

            <div className="d-lg-none youtube-g">
              <YouTube />
            </div>
          </div>
          <div className="recently">
            <RecentlyViewed limit={8} />
          </div>
        </>
      </div>
      <Footer />
    </>
  );
};
export default DetailPage;