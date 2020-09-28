import React from "react";
import { Layout } from "antd";

const { Footer: FooterL } = Layout;

const Footer = () => {
  const anio = new Date().getFullYear();

  const footerStyles = {
    backgroundColor: "#001529",
    padding: "70px 0",
  };

  return (
    <FooterL style={footerStyles} className="footer-c">
      <p>SD Bank Core ©{anio}</p>
    </FooterL>
  );
};

export default Footer;
