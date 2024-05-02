import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../contexts/Search";
import Seicon from "../../assets/icons/Vector (5).png";


const Search = ({toggleSearchBar})=> {
  // hooks
  const [values, setValues] = useSearch(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {  
    e.preventDefault();
    try {
      const { data } = await axios.get(`/product/search/${values?.keyword}`);
      // console.log(data);
      setValues({ ...values, results: data?.products });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="text"
        style={{ borderRadius: "0px" }}
        className="form-control real-search"
        placeholder="Search"
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        value={values.keyword}
      />
      <button
        className="btn real-search"
        type="submit"
        style={{ borderRadius: "0px", backgroundColor: "#0098B8"}}
      >
        {/* Search */}
        <img src={Seicon} alt="" onClick={toggleSearchBar} />
      </button>
    </form>
  );
}

export default Search
