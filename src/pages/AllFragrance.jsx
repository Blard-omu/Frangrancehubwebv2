import { useState, useEffect } from "react";
import "../css/AllFragance.css";
import ProductCard from "../components/ProductCardM";
import Accord from "../components/AccordionM";
import Pagination from "../components/PaginationM";
import { BiSort } from "react-icons/bi";
import OffCanvasButton from "../components/FilterbyM";
import Breadcrumbs from "../components/NABreadcCumbs";
import Footer from "../components/Footer";
import SideNav from "../components/nav/SideNav";
import Menu from "../components/nav/NavBar";
import ShowingAllfilter from "../components/ShowingAllfilter";
import SortBy from "../components/SortBy";
import axios from "axios";
import ProductCardLoading from "../components/ProductCardLoadingM";
import moment from "moment";

const AllFragrance = () => {
  //general data
  const [fetchProduct, setFetchProduct] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  //
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  //gender
  const [selectedGender, setSelectedGender] = useState([]);
  //brand
  const [selectedBrand, setSelectedBrand] = useState([]);
  //Fragrance
  const [selectedFragranceTypes, setSelectedFragranceTypes] = useState([]);
  //Scent
  const [selectedScentType, setSelectedScentType] = useState([]);
  //Price
  const [selectedPrice, setSelectedPrice] = useState([]);
  //Availability
  const [selectedAvailability, setSelectedAvailability] = useState(null);

  //Showing the selected in the page
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState();

  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  // Fetching from database
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/product/all?page=1&limit=1000000`
      );

      // const {products} = response.data;
      const shuffledProducts = shuffle(data?.products);

      setFetchProduct(shuffledProducts);
      setCurrentProducts(shuffledProducts);
      console.log(data?.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle adding and removing selected filters
  const handleSelectedFilter = (filter) => {
    setCurrentPage(1);

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

  // // Detecting device screen width
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  // Setting the limit for related products
  const limit = isMobile ? 20 : 15 && isTablet ? 15 : 15;

  // ---------------Pagination Start---------
  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    console.log("Changing page to:", pageNumber);
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber);
  };

  useEffect(() => {
    // Retrieve current page from local storage
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      console.log(storedPage);
      setCurrentPage(parseInt(storedPage));
    } else {
      setCurrentPage(1); 
    }
  }, []);

  // Pagination logic
  const productsPerPage = 15;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginate = currentProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // ---------------Pagination End---------

  useEffect(() => {
    let filteredProducts = fetchProduct;

    console.log("Selected Gender:", selectedGender);
    console.log("Selected Brand:", selectedBrand);
    //filter for Gender
    if (selectedGender.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedGender.includes(product.gender)
      );
    }
    //filter for Brand
    if (selectedBrand.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrand.includes(product.brand)
      );
    }

    //filter for Fragrance Type
    if (selectedFragranceTypes.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedFragranceTypes.includes(product.fragranceType)
      );
    }

    //filter for Scent Type
    if (selectedScentType.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedScentType.includes(product.scentType)
      );
    }
    //filter for Price
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

    // Filter by availability
    if (selectedAvailability !== null) {
      if (selectedAvailability === "true") {
        filteredProducts = filteredProducts.filter(
          (product) => product.isAvailable === true
        );
      } else {
        filteredProducts = filteredProducts.filter(
          (product) => product.isAvailable === false
        );
      }
    }

    setCurrentProducts(filteredProducts);
  }, [
    selectedGender,
    selectedBrand,
    selectedFragranceTypes,
    selectedScentType,
    selectedPrice,
    selectedAvailability,
  ]);

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
  const handleAvailabilityChange = (availability) => {
    setSelectedAvailability(availability);
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
      case "BestSeller":
        handleDefaultSort();
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
        // case "BestSeller":
        //   handleDefaultSort();
        //   break;
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
  const reverseArray = (array) => {
    return array.slice().reverse();
  };
  const reversedProducts = reverseArray(paginate);

  return (
    <>
      <Menu />
      <SideNav />
      <Breadcrumbs />
      <div className="m-section">
        <div className="m-main">
          <div className="m-title">
            <div className="title-left">
              <h4>All Featured Fragrance</h4>
              <p>
                Showing {productsPerPage} of {currentProducts.length} Products
              </p>
            </div>
            <div className="title-right">
              <span>Sort by</span>
              <SortBy handleSort={handleSort} />
            </div>
          </div>
          <div className="show-filterM">
            <ShowingAllfilter
              clearFilters={clearFilters}
              selectedFilters={selectedFilters}
            />
          </div>
          <div className="m-content">
            <div className="m-controls">
              <div className="control-text">
                <p>Filter By</p>
              </div>
              <div className="control-list">
                {/* Accodion start */}
                <Accord
                  handleCheckboxChange={handleCheckboxChange}
                  handleAvailabilityChange={handleAvailabilityChange}
                  selectedFilters={selectedFilters}
                  handleSelectedFilter={handleSelectedFilter}
                  currentProducts={currentProducts}
                />
                {/* Accordion ends */}
              </div>
            </div>
            <div className="m-controls-mobile">
              <OffCanvasButton
                handleCheckboxChange={handleCheckboxChange}
                handleAvailabilityChange={handleAvailabilityChange}
                handleSelectedFilter={handleSelectedFilter}
                selectedFilters={selectedFilters}
                clearFilters={clearFilters}
              />
              <h3>
                <BiSort />
                <SortBy handleSort={handleSort} />
              </h3>
            </div>
            <div className="m-products">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardLoading key={index} />
                ))
              ) : currentProducts.length > 0 ? (
                paginate.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))
              ) : (
                <h1>No Product Found</h1>
              )}
            </div>
          </div>
        </div>
        <div className="m-pagination">
          <Pagination
            totalItems={currentProducts.length}
            itemsPerPage={productsPerPage}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllFragrance;
