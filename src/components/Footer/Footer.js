import React from "react";
import { Layout } from "antd";

const { Footer: FooterL } = Layout;

const Footer = () => {
  const anio = new Date().getFullYear();

  const styles = {
    backgroundColor: "#001529",
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "60px",
    color: "#fafafa",
    width: "100%",
    overflow: "hidden",
    textAlign: "center",
  };

  return <FooterL style={styles}>SD Bank Core ©{anio}</FooterL>;
};

export default Footer;
