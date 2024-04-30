import { useEffect, useRef, useState } from "react";
import { settings } from "../../constants/spaceFeedImageSettings";
import ImageSlider from "../common/ImageSlider";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingComponent from "../common/Loading";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons"; // Importing the star icon from Font Awesome
import api from "../../api/config";
import { toast } from "react-toastify";

const UserSpaceFeedList = ({ spaceFeedList, loadMore, hasMore }) => {
  const scrollableRef = useRef();
  const [favouriteList, setFavouriteList] = useState([]);

  let auth = localStorage?.getItem("data");
  auth = JSON.parse(auth);

  const navigate = useNavigate()

  const handleStarClick = (e, id) => {
    e.preventDefault();
    const isFavourite = favouriteList.some((item) => item?.spaceFeedId === id);
    const updatedFavourites = isFavourite
      ? favouriteList.filter((product) => product?.spaceFeedId !== id)
      : [...favouriteList, { spaceFeedId: id }]; // Add product if not already favourited
    setFavouriteList(updatedFavourites);

    handleFavourite(id, isFavourite ? 0 : 1);
  };

  const handleFavourite = async (id, action) => {
    if(!!auth?.jwt){

      try {
        await api.post(`shortlist-space-feed/${id}/${action}`);
      } catch (error) {
        toast.error("Error adding or removing from favorites!");
        console.error(error, "error");
      }
    } else {
      navigate("/login");
    }
  };

  const fetchFavouriteList = async () => {
    try {
      const response = await api.get("/shortlisted-space-feed");
      if (response?.data?.status === 200) {
        setFavouriteList(response?.data?.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!!auth?.jwt) {
      fetchFavouriteList();
    }
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={spaceFeedList.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <>
            <LoadingComponent
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "50vh" }}
            />
          </>
        }
        scrollableTarget={scrollableRef.current}
      >
        <div className="rows">
          {spaceFeedList.map((item, index) => {
            return (
              <div className="cards p-0" key={index}>
                <Link
                to={!!auth?.jwt ? `/property-detail/${item?.spaceFeedId}` : "/login"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <>
                    {item?.spaceFeedMedia?.length > 0 && (
                      <>
                        {item?.spaceFeedMedia.length === 1 ? (
                          <>
                            {item?.spaceFeedMedia[0]?.url?.includes("mp4") ? (
                              <>
                                <div
                                  style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "300px",
                                  }}
                                >
                                  <video
                                    type="video/mp4"
                                    // className="cardImg img-fluid w-100"
                                    src={item?.spaceFeedMedia[0]?.url}
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
                                    onClick={(e) =>
                                      handleStarClick(e, item?.spaceFeedId)
                                    }
                                    className="star-icon"
                                    style={{
                                      color:
                                        !!auth?.jwt &&
                                        favouriteList.some(
                                          (favProduct) =>
                                            favProduct.spaceFeedId ===
                                            item?.spaceFeedId
                                        ) &&
                                        "#F5C000",
                                      cursor: "default",
                                    }}
                                  />
                                  {/* Star icon */}
                                </div>
                                <div className="px-3 py-2">
                                  <h5 className=" mb-0">{item?.name}</h5>
                                  <p className="mb-0">
                                    {item?.city}, {item?.state}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div style={{ position: "relative" }}>
                                  <img
                                    className="cardImg img-fluid w-100"
                                    src={item?.spaceFeedMedia[0]?.url}
                                    alt="Card cap"
                                    style={{ height: "300px" }}
                                  />
                                  <FontAwesomeIcon
                                    icon={faStar}
                                    onClick={(e) =>
                                      handleStarClick(e, item?.spaceFeedId)
                                    }
                                    className="star-icon"
                                    style={{
                                      color:
                                        !!auth?.jwt &&
                                        favouriteList.some(
                                          (favProduct) =>
                                            favProduct.spaceFeedId ===
                                            item?.spaceFeedId
                                        ) &&
                                        "#F5C000",
                                      cursor: "default",
                                    }}
                                  />
                                  {/* Star icon */}
                                </div>
                                <div className="px-3 py-2">
                                  <h5 className="mb-0">{item?.name}</h5>
                                  <p className="mb-0">
                                    {item?.city}, {item?.state}
                                  </p>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <ImageSlider
                              handleClick={handleStarClick}
                              height={300}
                              className="cardImg img-fluid w-100"
                              settings={settings}
                              item={item}
                              style={{
                                color:
                                  !!auth?.jwt &&
                                  favouriteList.some(
                                    (favProduct) =>
                                      favProduct.spaceFeedId ===
                                      item?.spaceFeedId
                                  ) &&
                                  "#F5C000",
                                cursor: "default",
                              }}
                            />
                            <div className="px-3 py-2">
                              <h5 className="mb-0">{item?.name}</h5>
                              <p className="mb-0">
                                {item?.city}, {item?.state}
                              </p>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                </Link>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};
export default UserSpaceFeedList;
