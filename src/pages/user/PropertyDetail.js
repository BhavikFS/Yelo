import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar";
import Carousel from "react-bootstrap/Carousel";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import "../../styles/DetailScreen.css";
import Play from "../../assets/images/Play.png";
import Pause from "../../assets/images/Pause.png";
import api from "../../api/config";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

function PropertyDetail() {
  const [map, setMap] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [propertyDetail, setPropertyDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const videoRef = useRef(null);
  const { id } = useParams();

  const togglePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const propertyDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/space-feed-details/${id}`);
      if (response.status === 200) {
        setPropertyDetail(response?.data?.response);
        setLat(response?.data?.response?.latitude);
        setLng(response?.data?.response?.longitude);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    propertyDetails();
  }, []);

  const [isMapViewClicked, setIsMapViewClicked] = useState(true);
  const [isMapViewClickedExpand, setIsMapViewClickedExpand] = useState(false);

  // const toggleMapView = (event) => {
  //   event.stopPropagation(); // This stops the event from propagating further
  //   setIsMapViewClicked(!isMapViewClicked); // Toggle the state
  // };

  const ExpandMapView = (event) => {
    event.stopPropagation(); // This stops the event from propagating further
    setIsMapViewClickedExpand(!isMapViewClickedExpand); // Toggle the state
  };

  useEffect(() => {
    if (!!lat && !!lng) {
      const loadMapScript = () => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCmYRzM9CMuVD0C0xkQP6Vt9VyVcfMKQ2o&libraries=places`;
        script.async = true;
        script.onload = initializeMap;
        document.body.appendChild(script);
      };

      loadMapScript();

      return () => {
        // Cleanup function to remove the script
        const scripts = document.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++) {
          if (scripts[i].src.includes("maps.googleapis.com")) {
            scripts[i].remove();
          }
        }
      };
    }
  }, [lat, lng]);

  const initializeMap = () => {
    const newMap = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: Number(propertyDetail?.latitude),
        lng: Number(propertyDetail?.longitude),
      }, // Set your initial center here
      zoom: 15,
    });

    // Create a marker and set its position
    const marker = new window.google.maps.Marker({
      position: {
        lat: Number(propertyDetail?.latitude),
        lng: Number(propertyDetail?.longitude),
      },
      map: newMap,
      title: "Property Location",
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // URL of the red marker icon
      },
    });

    setMap(newMap);
  };

  return (
    <>
      <Navbar />
      <div
        className="container-fluid border-bottom"
        style={{ paddingTop: "70px" }}
      >
        {loading ? (
          <>
            <Skeleton height={400} width={1342} />
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center">
              <div
                className="carousel-container"
                style={{
                  width: isMapViewClickedExpand
                    ? "0%"
                    : isMapViewClicked
                    ? "50%"
                    : "100%",
                }}
              >
                <Carousel style={{ minHeight: "400px" }}>
                  {propertyDetail?.spaceFeedMedia?.map((item, index) => (
                    <Carousel.Item
                      interval={5000}
                      style={{ minHeight: "400px" }}
                    >
                      {item?.url?.includes("mp4") ? (
                        <video
                          ref={videoRef}
                          type="video/mp4"
                          className="d-block w-100"
                          src={item?.url}
                          alt="Card cap"
                          height={400}
                        />
                      ) : (
                        <img
                          className="d-block w-100"
                          src={item?.url}
                          alt="Property"
                          height={400}
                        />
                      )}
                      {item?.url?.includes("mp4") && (
                        <>
                          {isPlaying ? (
                            <img
                              src={Pause}
                              onClick={togglePlayPause}
                              className="video-tag"
                              alt="Video Tag"
                            />
                          ) : (
                            <img
                              src={Play}
                              onClick={togglePlayPause}
                              className="video-tag"
                              alt="Video Tag"
                            />
                          )}
                        </>
                      )}
                      {/* <div className="custom-controls m-4">
                        <img
                          height={50}
                          src={MapView}
                          alt="Property"
                          onClick={(event) => toggleMapView(event)}
                        />{" "}
                        <br />
                        <br />
                        <span className="p-2">{`${index + 1} / ${
                          propertyDetail?.spaceFeedMedia?.length
                        }`}</span>
                      </div> */}
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <div
                className="map-container"
                style={{
                  width: isMapViewClickedExpand
                    ? "100%"
                    : isMapViewClicked
                    ? "50%"
                    : "0%",
                  transition: "width 0.5s ease-in-out",
                  position: "relative",
                }}
              >
                <div id="map" style={{ width: "100%", height: "400px" }}></div>
                {
                  isMapViewClicked && !isMapViewClickedExpand && (
                    <button
                      className="expand-map-btn"
                      onClick={(event) => ExpandMapView(event)}
                    >
                      Expand Map View
                    </button>
                  )
                  // )
                }

                {isMapViewClickedExpand && (
                  <button
                    className="exit-map-btn"
                    onClick={(event) => ExpandMapView(event)}
                  >
                    Exit Map View
                  </button>
                )}
              </div>
            </div>

            <div className="container my-3">
              <span className="fw-bold text-black">{propertyDetail?.name}</span>
              <br />
              <br />
              <span>
                {propertyDetail?.city}, {propertyDetail?.state},{" "}
                {propertyDetail?.pin}
              </span>
              <br />
            </div>
          </>
        )}
      </div>

      <div className="container-fluid border-bottom">
        <div className="container my-3">
          <div className="d-flex justify-content-start">
            {loading ? (
              <>
                <Skeleton width={400} height={350} />
              </>
            ) : (
              <>
                <div className="col-6" style={{ width: "max-content" }}>
                  <h6 className="fw-bold "> Details</h6>
                  <div className="detail-block  w-100 text-start">
                    <div className="detail-item mb-2 d-flex justify-content-start align-items-center">
                      <span className="label fw-normal text-black col-8">
                        Property type :{" "}
                      </span>
                      <span className="text col-4">
                        {propertyDetail?.spaceFeedDetails?.businessType}
                      </span>
                    </div>
                    <div className="detail-item mb-2 d-flex align-items-center">
                      <span className="label fw-normal col-8">
                        Price/SQFT :
                      </span>
                      <span className="text">
                        {" "}
                        {propertyDetail?.spaceFeedDetails?.price}
                      </span>
                    </div>
                    <div className="detail-item mb-2 d-flex align-items-center">
                      <span className="label fw-normal col-8">
                        Total SQFT :
                      </span>
                      <span className="text col-4">
                        {" "}
                        {propertyDetail?.spaceFeedDetails?.totalSpace}
                      </span>
                    </div>
                    <div className="detail-item mb-2 d-flex align-items-center">
                      <span className="label fw-normal col-8">
                        Remaining Lease Term :
                      </span>
                      <span className="text col-4">
                        {" "}
                        {
                          propertyDetail?.spaceFeedDetails?.remainingLeaseTerm
                        }{" "}
                      </span>
                    </div>
                    <div className="detail-item mb-2 d-flex align-items-center">
                      <span className="label fw-normal col-8">
                        Business type :
                      </span>
                      <span className="text col-4">
                        {propertyDetail?.spaceFeedDetails?.businessType}
                      </span>
                    </div>
                    <div className="detail-item mb-2 d-flex align-items-center">
                      <span className="label fw-normal col-8">Layout :</span>
                      <span className="text col-4">
                        {propertyDetail?.spaceFeedDetails?.layout}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ width: "max-content", marginLeft: "6rem" }}>
                  <h6 className="fw-bold"> &nbsp;</h6>

                  <div className="detail-block  w-100 text-start">
                    <div className="detail-item mb-2 d-flex justify-content-start align-items-center">
                      <span className="label fw-normal col-8">Subtype : </span>
                      <span className="text col-4">
                        {" "}
                        {propertyDetail?.spaceFeedDetails?.subBusinessType}
                      </span>
                    </div>
                    <div className="detail-item mb-2 d-flex align-items-center">
                      <span className="label fw-normal col-8">
                        Total Rent Fee + Other Costs :
                      </span>
                      <span className="text col-4">$50.00</span>
                    </div>
                    <div className="detail-item mb-2 d-flex align-items-center">
                      <span className="label fw-normal col-8">
                        Available SQFT :
                      </span>
                      <span className="text col-4">
                        {propertyDetail?.spaceFeedDetails?.availableSpace}
                      </span>
                    </div>
                    <div className="detail-item mb-2 d-flex align-items-center">
                      <span className="label fw-normal col-8">
                        Minimum Sub Lease Term :
                      </span>
                      <span className="text col-4">
                        {propertyDetail?.spaceFeedDetails?.minSubLeaseTerm}{" "}
                      </span>
                    </div>
                    <div className="detail-item mb-2 d-flex align-items-center">
                      <span className="label fw-normal col-8">
                        Sub Lease Business Type :
                      </span>
                      <span className="text col-4">Cloth</span>
                    </div>
                    <div className="detail-item mb-2 d-flex align-items-center">
                      <span className="label fw-normal col-8">Parking :</span>
                      <span className="text col-4">
                        {propertyDetail?.spaceFeedDetails?.parking}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid border-bottom">
        <div className="container my-3">
          <div className="d-flex justify-contetn-start">
            <div style={{ width: "max-content" }}>
              <h6 className="fw-bold"> Description</h6>
              {loading ? (
                <Skeleton width={1342} count={4} />
              ) : (
                <p className="text-black">
                  {propertyDetail?.spaceFeedDetails?.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid border-bottom">
        <div className="container my-3">
          <div className="d-flex justify-contetn-start">
            <div style={{ width: "max-content" }}>
              <h6 className="fw-bold"> Provider Information</h6>

              <div className="assign-doctor-card">
                <div className="d-flex">
                  <div className="image-part px-1 ">
                    {loading ? (
                      <Skeleton circle height={80} width={80} />
                    ) : (
                      <img
                        src={
                          !!propertyDetail?.providerDetails?.profileImage
                            ? propertyDetail?.providerDetails?.profileImage
                            : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                        }
                        height={150}
                        width={150}
                        style={{ borderRadius: "50%" }}
                        alt="Patient"
                      />
                    )}

                    <br />
                    <span className="fw-bold mt-3 px-5 ">
                      {loading ? (
                        <Skeleton />
                      ) : (
                        `${propertyDetail?.providerDetails?.firstName} ${propertyDetail?.providerDetails?.lastName}`
                      )}
                    </span>
                  </div>
                  {loading ? (
                    <Skeleton
                      style={{ marginLeft: "20px" }}
                      height={100}
                      width={1000}
                    />
                  ) : (
                    <>
                      <div
                        className="text-part d-flex flex-column justify-content-center"
                        style={{ marginLeft: "2rem" }}
                      >
                        <span className="name d-flex justify-content-start align-items-center">
                          License: {propertyDetail?.providerDetails?.licenseNo}
                        </span>
                        <span className="name d-flex justify-content-center align-items-center">
                          Address: {propertyDetail?.address1}
                        </span>
                      </div>
                      <div
                        className="text-part d-flex flex-column justify-content-center"
                        style={{ marginLeft: "2rem" }}
                      >
                        <button
                          type="button"
                          className="border-0 d-flex justify-content-between  px-2 py-2 align-items-center"
                          style={{
                            whiteSpace: "nowrap",
                            display: "inline-flex",
                            backgroundColor: "#F5C000",
                          }}
                        >
                          Call +{propertyDetail?.providerDetails?.mobile} &nbsp;{" "}
                          <FontAwesomeIcon icon={faPhone} />
                        </button>

                        <a
                          href={`mailto:${propertyDetail?.providerDetails?.email}`}
                          style={{ textDecoration: "none" }} // This removes the underline from the link
                        >
                          <button
                            type="button"
                            className=" border-0 d-flex justify-content-between px-2 py-2 align-items-center"
                            style={{
                              whiteSpace: "nowrap",
                              display: "inline-flex",
                              backgroundColor: "#F5C000",
                              marginTop: "1rem",
                            }}
                          >
                            Connect with{" "}
                            {propertyDetail?.providerDetails?.firstName}{" "}
                            <FontAwesomeIcon icon={faEnvelope} />
                          </button>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default PropertyDetail;
