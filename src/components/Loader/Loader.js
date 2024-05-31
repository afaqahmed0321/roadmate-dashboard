import React from "react";
import { Bars } from "react-loader-spinner";
const Loader = ({ color, width, height }) => {
  return (
    <Bars
      height={height}
      width={width}
      color={color}
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
