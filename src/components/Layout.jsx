import Menu from "./nav/NavBar";
import SideNav from "./nav/SideNav";
import Footer from "./Footer";


const Layout = ({ children }) => {
  return (
    <div className={`layout-wrapper`}>
      <div className="layout-inner">
        <Menu />
        <SideNav />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
