import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons"; // Importing the star icon from Font Awesome

const ImageSlider = ({
  settings,
  item,
  height,
  className,
  handleClick,
  icon,
  style
}) => {
  return (
    <Slider {...settings}>
      {item?.spaceFeedMedia?.map((image, index) => (
        <div key={index}>
          <div style={{ position: "relative", width: "100%", height: "300px" }}>
            {image?.url?.includes("mp4") ? (
              <video
                type="video/mp4"
                className={className}
                src={image?.url}
                alt="Card cap"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                controls
              />
            ) : (
              <img
                className={className}
                height={height}
                src={image?.url}
                alt={`Card cap`}
                style={{ height: "250px" }}
              />
            )}
            {!icon && (
              <FontAwesomeIcon
                onClick={(e) => handleClick(e, item?.spaceFeedId)}
                icon={faStar}
                className="star-icon"
                style={style}
              />
            )}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
