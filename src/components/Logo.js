import React from "react";
import { useStyle } from "../styles";

const Logo = (props) => {
  const styles = useStyle();
  return (
    <img
      className={props.large ? styles.largeLogo : styles.logo}
      alt="Food Order"
      src="/images/logo.png"
    ></img>
  );
};

export default Logo;
