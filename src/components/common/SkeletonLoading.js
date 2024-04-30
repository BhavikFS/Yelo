import React from "react";
import Skeleton from "react-loading-skeleton";

const CustomSkeleton = ({ children, loading }) => {
  const renderSkeleton = (element, index) => {
    if (React.isValidElement(element)) {
      const { type, props } = element;
      const { children: innerChildren } = props;

      if (innerChildren) {
        return React.createElement(
          type,
          { key: index, ...props },
          React.Children.map(innerChildren, (child, i) => renderSkeleton(child, i))
        );
      }

      if (loading) {
        return <Skeleton key={index} />;
      }

      return element;
    }

    return element;
  };

  return <>{React.Children.map(children, (child, index) => renderSkeleton(child, index))}</>;
};

export default CustomSkeleton;
