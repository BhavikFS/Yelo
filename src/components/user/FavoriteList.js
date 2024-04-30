import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ImageSlider from "../common/ImageSlider";
import { settings } from "../../constants/spaceFeedImageSettings";

const FavoriteList = ({ list }) => {
  console.log(list, "list");
  return (
    <>
      {list?.map((item) => {
        return (
          <div class="col-md-3">
            <div class="card position-relative">
              
              {item?.spaceFeed?.spaceFeedMedia?.length > 0 && (
                <>
                  {item?.spaceFeed?.spaceFeedMedia?.length === 1 ? (
                    <>
                      {item?.spaceFeed?.spaceFeedMedia[0]?.url?.includes(
                        "mp4"
                      ) ? (
                        <>
                                  <div style={{ position: "relative", width: "100%", height: "300px" }}>

                          <video
                            type="video/mp4"
                            src={item?.spaceFeed?.spaceFeedMedia[0]?.url}
                            alt="Card cap"
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            controls
                          />
                          <FontAwesomeIcon
                            icon={faStar}
                            className="star-icon"
                            style={{
                              color: "#F5C000",
                              cursor: "default",
                            }}
                          />
                          </div>
                          <div class="card-body d-flex justify-content-between align-items-start">
                            <div>
                              <h5 class="card-title">
                                {item?.spaceFeed?.name}
                              </h5>
                              <p class="card-text margin-custum">
                                {item?.spaceFeed?.city}, {item?.spaceFeed?.state} {item?.spaceFeed?.pin}
                              </p>
                            </div>
                            <div></div>
                          </div>
                        </>
                      ) : (
                        <>
                                                          <div style={{ position: "relative", width: "100%", height: "300px" }}>

                          <img
                            src={item?.spaceFeed?.spaceFeedMedia[0]?.url}
                            alt=""
                            className="card-img-top"
                            style={{ height: "300px" }}
                          />
                          <FontAwesomeIcon
                            icon={faStar}
                            className="star-icon"
                            style={{
                              color: "#F5C000",
                              cursor: "default",
                            }}
                          />
                          </div>
                          <div class="card-body d-flex justify-content-between align-items-start">
                            <div>
                              <h5 class="card-title">
                                {item?.spaceFeed?.name}
                              </h5>
                              <p class="card-text margin-custum">
                                {item?.spaceFeed?.city}, {item?.spaceFeed?.state} {item?.spaceFeed?.pin}
                              </p>
                            </div>
                            <div></div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <ImageSlider
                        // handleClick={handleStarClick}
                        height={300}
                        style={{ color: "#F5C000", cursor: "default" }}
                        settings={settings}
                        item={item?.spaceFeed}
                      />
                      <div class="card-body d-flex justify-content-between align-items-start">
                        <div>
                          <h5 class="card-title">{item?.spaceFeed?.name}</h5>
                          <p class="card-text margin-custum">
                            {item?.spaceFeed?.city}, {item?.spaceFeed?.state} {item?.spaceFeed?.pin}
                          </p>
                        </div>
                        <div></div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FavoriteList;
