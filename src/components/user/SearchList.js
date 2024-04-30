import React from "react";
import ImageSlider from "../common/ImageSlider";
import { settings } from "../../constants/spaceFeedImageSettings";

const SearchList = ({ showMap, searchResponse }) => {
  return (
    <>
      <div className={`row ${showMap ? "w-50" : "w-100"}`}>
        <div
          className={`mt-2 col-12 ${showMap ? "list-scroll" : ""}`}
          style={{
            backgroundColor: "#fff",
            height: "calc(100vh - 100px)",
            overflowY: "auto",
          }}
        >
          <div className="card-community mt-4 shadow">
            <div className="card-body">
              <div className={`${showMap ? "" : "row"}`}>
                {/* List Start */}
                {searchResponse?.map((item) => (
                  <div
                    className={` mt-2 mb-2 ${
                      showMap ? "col-lg-12" : "col-lg-4"
                    }`}
                  >
                    <div className="card w-100  ">
                      {item?.spaceFeedMedia?.length > 0 && (
                        <>
                          {item?.spaceFeedMedia.length === 1 ? (
                            <>
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: "300px",
                                }}
                              >
                                {item?.spaceFeedMedia[0]?.url?.includes(
                                  "mp4"
                                ) ? (
                                  <video
                                    type="video/mp4"
                                    className="card-img-top"
                                    src={item?.spaceFeedMedia[0]?.url}
                                    alt="Card cap"
                                    controls
                                    style={{
                                      position: "absolute",
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  <img
                                    className="card-img-top"
                                    src={
                                      item?.spaceFeedMedia[0]?.url ||
                                      "https://picsum.photos/seed/picsum/200/200"
                                    }
                                    alt="Card cap"
                                    height={300}
                                  />
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <ImageSlider
                                height={300}
                                className="card-img-top"
                                settings={settings}
                                item={item}
                                icon={"none"}
                              />
                            </>
                          )}
                        </>
                      )}
                      <div className="card-body">
                        <h5 className="card-title text-body">{item?.name}</h5>
                        {/* <h6 className="text-body">Restaurant Space</h6> */}
                        <span className="text-black-50">{item?.address1}</span>
                        <br />
                        <span className="text-black-50">
                          {item?.city}, {item?.state} {item?.pin && item?.pin}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* List End */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`mt-4 ${showMap ? "d-block w-50" : "d-none"}`}
        style={{
          backgroundColor: "#fff",
          height: "calc(100vh - 100px)",
          overflow: "hidden",
        }}
      >
        <div>
          <div className="mt-4">
            <div
              className="map-container"
              style={{
                width: "100%",
                transition: "width 0.5s ease-in-out",
                position: "relative",
              }}
            >
              <div id="map" style={{ width: "100%", height: "400px" }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchList;
