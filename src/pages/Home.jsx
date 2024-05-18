import Hero from "../components/Hero";
import Brands from "../components/Brand";
import Testimonies from "../components/Testimonies";
import BlogCard from "../components/Blog";
import Footer from "../components/Footer";
import SideNav from "../components/nav/SideNav";
import Menu from "../components/nav/NavBar";
import CountDownTimer from "../components/CountDownTimer";
import AllfragranceComponent from "../components/AllfragranceComponent";
import NewArrivalComponent from "../components/NewArrivalComponent";
import BestSeller from "../components/BestSeller";

const Home = () => {
  return (
    <>
      <Menu />
      <div>
      <SideNav />
      </div>
      <Hero />
      <BestSeller/>
      <Brands />
      <NewArrivalComponent/>
      <CountDownTimer/>
      <AllfragranceComponent/>
      <Testimonies />
      <BlogCard />
      <Footer />
    </>
  );
};

export default Home;
