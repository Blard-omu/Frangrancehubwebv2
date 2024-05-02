import React, {useState} from 'react'
import "../css/Newarrival.css"
// import Dropdown from 'react-bootstrap/Dropdown';

function Mydropdown1({handleSort}) {
    const [selectedOption, setSelectedOption] = useState("Best Seller");

    const handleSortClick = (option) => {
        setSelectedOption(option);
        handleSort(option);
      };
      
    return (
        <div>
            <form>
                <label className="me-2"><b>Sort By</b></label>
                <select name="cars" id="cars">
                    <option value="New Arrival">
                    {selectedOption === "A-Z"
            ? setSelectedOption("Alphabetically, A-Z")
            : null}
                        New Arrival</option>
                    <option value="Best Seller" onClick={() => handleSortClick("BestSeller")}>
                    {selectedOption === "Z-A"
            ? setSelectedOption("Alphabetically, Z-A")
            : null}
                        Best Seller</option>
                    <option value="Best Seller">
                    {selectedOption === "LowToHigh"
            ? setSelectedOption("Price, low to high")
            : null}
                        Price, Low to High</option>
                    <option value="Best Seller">
                    {selectedOption === "HighToLow"
            ? setSelectedOption("Price, high to low")
            : null}
                        Price, High to Low</option>
                    <option value="Best Seller">Date, Old to New</option>
                    <option value="Best Seller">Date, New to Old</option>
                </select>
            </form>
        </div>

    );
}
export default Mydropdown1;

export function Mydropdown2({handleSort}) {
    const [selectedOption, setSelectedOption] = useState("Best Seller");

    return (
        <div className='select-wrapper'>
            <select name="cars" id="cars"  >
                <option value="Best Seller">Best Seller</option>
                <option value="Featured">Featured</option>
                <option value="Best A-Z">Alphabetically, A-Z</option>
                <option value="Z-A">Alphabetically, Z-A</option>
                <option value="Low To HIgh">Price, Low to High</option>
                <option value="High To High">Price, High to Low</option>
                <option value="Old To New">Date, Old to New</option>
                <option value="New To Old">Date, New to Old</option>
            </select>
        </div>

    );
}



