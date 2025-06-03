import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0b1a33] to-[#1a2233] ">
    <Navbar />
    <main className="flex-1 flex flex-col">{children}</main>
    <Footer />
  </div>
);

export default Layout;