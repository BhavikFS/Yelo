import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingComponent = ({ className, style }) => {
  return (
    <>
      <div className={className} style={style}>
        <Spinner animation="border" variant="warning" />
      </div>
    </>
  );
};

export default LoadingComponent;
