import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import Footer from "../components/Footer";
import Menu from "../components/nav/NavBar";
import SideNav from "../components/nav/SideNav";

const Contact = () => {
  return (
    <>
      <Menu />
      <SideNav />
      <Jumbotron title="COMING SOON..." subTitle="Contact Page" />
      <Footer />
    </>
  );
};

export default Contact;
