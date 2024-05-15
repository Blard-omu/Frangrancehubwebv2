import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import axios from "axios";
import { toast } from "react-toastify";
import Menu from "../../components/nav/NavBar";
import SideNav from "../../components/nav/SideNav";
import Footer from "../../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";


const UserProfile = () => {

  const navigate = useNavigate();
  const location = useLocation();
  // context
  const { auth, setAuth } = useAuth();
  // state
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (auth?.user) {
      const { name, email, username, address, image } = auth.user;
      setName(name);
      setEmail(email);
      setUserName(username);
      setAddress({...address});
      setAvatar(image)
    }
  }, [auth?.user]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("address[street]", address.street);
      formData.append("address[city]", address.city);
      formData.append("address[state]", address.state);
      formData.append("address[zip]", address.zip);
      formData.append("image", image);

      const { data } = await axios.put("/auth/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Profile updated");
        const userRole = data?.updatedUser?.role;
        navigate(
          location.state ? location.state.from : `/dashboard/${userRole === 1 ? "admin" : "user"}`
        );

      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Menu />
      <Jumbotron
        title={`Hello ${
          auth?.user?.username ? auth?.user?.username : auth?.user?.name
        }`}
        subTitle="Profile"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Profile</div>
            <div className="rounded" style={{width: "80px", height: "80px"}}>
              {avatar && <img src={avatar} alt="avatar" className="image-fluid w-100"/> }
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
              />

              <input
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />

              <input
                type="email"
                className="form-control m-2 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={true}
              />

              

<input
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your street address"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your city"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your state"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your zip code"
                value={address.zip}
                onChange={(e) =>
                  setAddress({ ...address, zip: e.target.value })
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button className="btn btn-primary m-2 p-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;

