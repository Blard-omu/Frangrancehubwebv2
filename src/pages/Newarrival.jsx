import React, { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import "../css/Newarrival.css";
import "../css/NAProductcard.css";
import BreadCrumb from "../components/NABreadcCumbs";
import ProductCard from "../components/NAProductCard";
import Footer from "../components/Footer";
import OffCanvasButton from "../components/NAFilter";
import SideNav from "../components/nav/SideNav";
import Menu from "../components/nav/NavBar";
import axios from "axios";
import Pagination from "../components/PaginationM";
import SortBy from "../components/SortBy";
// import Skeleton from "react-loading-skeleton";
import ShowingAllfilter from "../components/ShowingAllfilter";
// import ShowingAllfilter from "../components/ShowingAllfilter";
import ProductCardLoading from "../components/ProductCardLoadingM";
import Accord from "../components/AccordionM";
import moment from "moment";
import NAPagination from "../components/NAPagination";

const Newarrival = () => {
  const [fetchProduct, setFetchProduct] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPageCh, setCurrentPageCh] = useState(1);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedAlphabet, setSelectedAlphabet] = useState("");
  const [selectedFragranceTypes, setSelectedFragranceTypes] = useState([]);
  const [selectedScentType, setSelectedScentType] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;
  // // Setting the limit for related products
  const limit = isMobile ? 20 : 15 && isTablet ? 15 : 15;
  const [loading, setLoading] = useState(false);
  const itemsPerPage = limit;

  const fetchData = async () => {
    // setLoading(true);
    try {
      setLoading(true);
      const response = await axios.get(`/product/all?page=1&limit=100000`);
      setFetchProduct(response?.data?.products);
      setCurrentProducts(response?.data?.products);
      console.log(response?.data?.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Pagination
  // ---------------Pagination Start---------
  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    console.log("Changing page to:", pageNumber);
    setCurrentPageCh(pageNumber);
    localStorage.setItem("currentPageCh", pageNumber);
  };

  useEffect(() => {
    // Retrieve current page from local storage
    const storedPage = localStorage.getItem("currentPageCh");
    if (storedPage) {
      console.log(storedPage);
      setCurrentPageCh(parseInt(storedPage));
    } else {
      setCurrentPageCh(1); // Set default page to 1 if not found in local storage
    }
  }, []);

  // Pagination logic
  const productsPerPage = 15;
  const indexOfLastProduct = currentPageCh * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginate = currentProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // ---------------Pagination End---------
  useEffect(() => {
    let filteredProducts = fetchProduct;
    //filtering by Gender
    if (selectedGender.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedGender.includes(product.gender)
      );
    }
    //filtering by Brand
    if (selectedBrand.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrand.includes(product.brand)
      );
    }
    //filtering by Fragrance Type
    if (selectedFragranceTypes.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedFragranceTypes.includes(product.fragranceType)
      );
    }
    //filtering by Scent Type
    if (selectedScentType.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedScentType.includes(product.scentType)
      );
    }
    // filtering by Price
    if (selectedPrice.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        if (selectedPrice.includes("Under10K")) {
          return product.price <= 10000;
        } else if (selectedPrice.includes("10kTo50K")) {
          return product.price >= 10000 && product.price <= 50000;
        } else if (selectedPrice.includes("Over50k")) {
          return product.price >= 50000;
        }
      });
    }
    // Filtering by availability
    if (selectedAvailability !== null) {
      if (selectedAvailability === "true") {
        filteredProducts = filteredProducts.filter(
          (product) => product.isavailability === true
        );
      } else {
        filteredProducts = filteredProducts.filter(
          (product) => product.isavailability === false
        );
      }
    }
    setCurrentProducts(filteredProducts);
  }, [
    selectedGender,
    selectedBrand,
    selectedFragranceTypes,
    selectedScentType,
    selectedAvailability,
  ]);

  console.log(currentProducts);
  useEffect(() => {
    localStorage.setItem('currentProducts', JSON.stringify(currentProducts));
  }, [currentProducts]);

  // Load state on component mount
  useEffect(() => {
    const savedCurrentProducts = JSON.parse(localStorage.getItem('currentProducts'));
    if (savedCurrentProducts) {
      setCurrentProducts(savedCurrentProducts);
    }
  }, []);

  const handleCheckboxChange = (event, value, category) => {
    const isChecked = event.target.checked;
    switch (category) {
      case "gender":
        setSelectedGender((prevState) =>
          isChecked
            ? [...prevState, value]
            : prevState.filter((item) => item !== value)
        );
        break;
      case "brandType":
        setSelectedBrand((prevState) =>
          isChecked
            ? [...prevState, value]
            : prevState.filter((item) => item !== value)
        );
        break;
      case "fragranceType":
        setSelectedFragranceTypes((prevState) =>
          isChecked
            ? [...prevState, value]
            : prevState.filter((item) => item !== value)
        );
        break;
      case "scentType":
        setSelectedScentType((prevState) =>
          isChecked
            ? [...prevState, value]
            : prevState.filter((item) => item !== value)
        );
        break;
      case "price":
        setSelectedPrice((prevState) =>
          isChecked
            ? [...prevState, value]
            : prevState.filter((item) => item !== value)
        );
        break;
      default:
        break;
    }
  };
  const handleShow = () => setShowFilter(!showFilter);
  const handleClick = () => setShowSort(!showSort);

  const handleAvailabilityChange = (availability) => {
    setSelectedAvailability(availability);
  };

  const handleSelectedFilter = (filter) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((f) => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };
  const clearFilters = () => {
    setSelectedFilters([]);
    setSelectedGender([]);
    setSelectedBrand([]);
    setSelectedFragranceTypes([]);
    setSelectedScentType([]);
    setSelectedPrice([]);
    setSelectedAvailability([]);
  };

  const handleDefaultSort = () => {
    setCurrentProducts([...fetchProduct]);
  };

  const handleSort = (option) => {
    switch (option) {
      case "A-Z":
        setCurrentProducts(
          [...currentProducts].sort((a, b) => a.name.localeCompare(b.name))
        );

        break;
      case "Z-A":
        setCurrentProducts(
          [...currentProducts].sort((a, b) => b.name.localeCompare(a.name))
        );
        break;
      case "LowToHigh":
        setCurrentProducts(
          [...currentProducts].sort((a, b) => a.price - b.price)
        );
        break;
      case "HighToLow":
        setCurrentProducts(
          [...currentProducts].sort((a, b) => b.price - a.price)
        );
        break;
      case "oldToNew":
        setCurrentProducts(
          [...currentProducts].sort(
            (a, b) => moment(a.createdAt) - moment(b.createdAt)
          )
        );

        break;
      case "newToOld":
        setCurrentProducts(
          [...currentProducts].sort((a, b) =>
            moment(b.createdAt).diff(moment(a.createdAt))
          )
        );
        break;
      case "BestSeller":
        handleDefaultSort();
        break;
      case "OldToNew":
        setCurrentProducts(
          [...currentProducts].sort(
            (a, b) => moment(a.createdAt) - moment(b.createdAt)
          )
        );
        break;
      case "NewToOld":
        setCurrentProducts(
          [...currentProducts].sort(
            (a, b) => moment(b.createdAt) - moment(a.createdAt)
          )
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Menu />
      <SideNav />
      <div className="arrival-desk-div ">
        <div className="arrival-top-div-desk ">
          <div className="d-none d-md-block d-lg-block ms-md-2 ms-lg-4">
            <BreadCrumb />
          </div>
          <div className="d-flex justify-content-between ">
            <div className="d-block d-md-none d-lg-none mx-3 my-3">
              <h3>New Arrivals</h3>
              {/* {currentProducts.length == lastIndex ? (
                <span>
                  Showing {firstIndex + 1} - {currentProducts.length} of{" "}
                  {currentProducts.length} Products Products
                </span>
              ) : (
                <span>
                  Showing {firstIndex + 1} - {lastIndex} of{" "}
                  {currentProducts.length} Products
                </span>
              )} */}
            </div>
            <div className="d-none d-md-block d-lg-block w-lg-75 ms-lg-4 mx-md-5 my-md-4">
              <h3>New Arrivals</h3>
              {/* {currentProducts.length == lastIndex ? (
                <span>
                  Showing {firstIndex + 1} - {currentProducts.length} of{" "}
                  {currentProducts.length} Products Products
                </span>
              ) : (
                <span>
                  Showing {firstIndex + 1} - {lastIndex} of{" "}
                  {currentProducts.length} Products
                </span>
              )} */}
            </div>

            {/* Sort by desktop  */}
            <div className="d-none d-md-none d-lg-block mt-lg-5 d-lg-flex">
              <div className="me-3 mt-2">Sort By</div>
              <div className="">
                <SortBy handleSort={handleSort} />
              </div>
              {/* Dropdown for desktop */}
            </div>
          </div>
        </div>

        <div className="arrival d-block d-md-block d-lg-none mb-3 border border-2">
          <div className="arrival-top-div-mob px-md-5 d-flex mx-3 mb-2 mx-md-0 mb-md-0">
            <div className="arrival-filter-div ">
              <OffCanvasButton
                handleCheckboxChange={handleCheckboxChange}
                handleAvailabilityChange={handleAvailabilityChange}
                handleSelectedFilter={handleSelectedFilter}
                selectedFilters={selectedFilters}
              // clearFilters={clearFilters}
              />
            </div>

            {/* Sort by mobile and Tablet */}
            <div className="d-flex mt-3">
              <div>
                <BiSort />
              </div>
              <div>
                <SortBy handleSort={handleSort} />
              </div>
            </div>
          </div>
        </div>
        <div className="arrival-products-div-mob d-flex justify-content-center align-items-center flex-wrap gap-3 ">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <ProductCardLoading key={index} />
            ))
          ) : currentProducts.length > 0 ? (
            <>
              {paginate.map((product) => {
                return (
                  <div
                    className=" d-block d-md-block d-lg-none"
                    key={product._id}
                  >
                    <ProductCard products={product} />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <h3 className="text-center d-block d-md-block d-lg-none">
                No Products Found
              </h3>
            </>
          )}
        </div>
        <div className="pagination d-block d-md-block d-lg-none ">
          <NAPagination
            totalItems={currentProducts.length}
            itemsPerPage={productsPerPage}
            onPageChange={handlePageChange}
            currentPageCh={currentPageCh}
            setCurrentPageCh={setCurrentPageCh}
          />
        </div>
        <div className="d-none d-md-block d-lg-block ms-5 w-50">
          <ShowingAllfilter
            clearFilters={clearFilters}
            selectedFilters={selectedFilters}
          />
        </div>
        <div className="arrival-main-div">
          <div className="arrival-filter-div d-none d-md-none d-lg-block ms-lg-5 me-lg-3">
            <h6 className="ms-3 mt-3 mb-2">
              <b>Filter By</b>
            </h6>
            <Accord
              handleCheckboxChange={handleCheckboxChange}
              handleAvailabilityChange={handleAvailabilityChange}
              handleSelectedFilter={handleSelectedFilter}
              currentProducts={currentProducts}
              selectedFilters={selectedFilters}
            />
          </div>

          {/* Desktop */}

          <div className="arrival-products-div-desk d-flex flex-wrap gap-3 ">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <ProductCardLoading key={index} />
              ))
            ) : currentProducts.length > 0 ? (
              <>
                {paginate.map((product) => {
                  return (
                    <div
                      className=" d-none d-md-none d-lg-block"
                      key={product._id}
                    >
                      <ProductCard products={product} />
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <h3 className="text-center d-none d-md-none d-lg-block">
                  No Products Found
                </h3>
              </>
            )}

            <div className="d-none d-md-none d-lg-block m-pagination">
            <NAPagination
            totalItems={currentProducts.length}
            itemsPerPage={productsPerPage}
            onPageChange={handlePageChange}
            currentPageCh={currentPageCh}
            setCurrentPageCh={setCurrentPageCh}
          />
            </div>

            {/* Sort by for desktop drop down is in a dropdown component */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Newarrival;
