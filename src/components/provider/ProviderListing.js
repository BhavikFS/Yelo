import React from "react";
import ImageSlider from "../common/ImageSlider";
import { settings } from "../../constants/spaceFeedImageSettings";
import "../../styles/Comunity.css"
const ProviderListing = ({ spaceFeedList }) => {
  return (
    <>
      {spaceFeedList?.map((item) => (
        <div className="col-lg-4">
          <div className="card-list w-100">
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
                      {item?.spaceFeedMedia[0]?.url?.includes("mp4") ? (
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
              <h5 className="card-title text-body mt-4">{item?.name}</h5>
              {/* <h6 className="text-body">Restaurant Space</h6> */}
              <span className="text-black-50 mt-1">{item?.address1}</span>
              <br />
              <span className="text-black-50">
                {item?.city}, {item?.state} {item?.pin && item?.pin}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProviderListing;
