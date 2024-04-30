import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/Navbar";
import SearchList from "../../components/user/SearchList";
import "../../styles/Comunity.css";
import { useLocation } from "react-router-dom";
import NoDataFound from "../../components/common/NoDataFound";

const PropertySearch = () => {
  const [showMap, setShowMap] = useState(true); // State to track whether to show the map
  const [searchResponse, setSearchResponse] = useState([]);
  const [mapData, setMapData] = useState([]);
  const location = useLocation();

  console.log(searchResponse, "searchResponse");
  console.log(mapData, "mapData");

  useEffect(() => {
    if (!!location?.state?.searchData) {
      setSearchResponse(location?.state?.searchData?.response);
    }
  }, [location]);

  useEffect(() => {
    if (searchResponse?.length > 0) {
      const newData =
        searchResponse &&
        searchResponse?.map((item) => {
          return {
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
            imageUrl: item?.spaceFeedMedia[0]?.url,
          };
        });
      setMapData(newData);
    }
  }, [searchResponse]);

  useEffect(() => {
    if (searchResponse?.length > 0 && mapData.length > 0) {
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
  }, [searchResponse, mapData]);

  const initializeMap = () => {
    const newMap = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: Number(12.8874283),
        lng: Number(77.6419887),
      },
      zoom: 11,
      zoomControl: true, // Enable zoom control
    });

    // Define an array to store marker objects
    const markers = [];
    // Loop through your list of locations to create markers
    mapData.forEach((location) => {
      // Create a marker for each location
      const marker = new window.google.maps.Marker({
        position: {
          lat: Number(location.latitude),
          lng: Number(location.longitude),
        },
        map: newMap,
      });

      // Add a listener to show the image on marker hover
      marker.addListener("mouseover", () => {
        const imageSrc = location?.imageUrl;
        console.log(imageSrc);
        if (!imageSrc.includes("mp4")) {
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<img style="width: 230px;" src="${imageSrc}" alt="Location Image" />`,
          });
          infoWindow.open(newMap, marker);
        } else {
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<video controls type="video/mp4" style="width: 250px;" src="${imageSrc}" alt="Location Image" />`,
          });
          infoWindow.open(newMap, marker);
        }
      });

      // Push the marker object to the markers array
      markers.push(marker);
    });
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid " style={{ paddingTop: "70px" }}>
        <div className="">
          <div class="d-flex  align-items-center justify-content-between">
            {searchResponse?.length > 0 && (
              <div>
                <div class="mt-5 ml-4 px-5">
                  <h4 class="px-2">Restaurants Space</h4>
                  <h6 class="px-2 ml-2">India</h6>

                  <h5 class="px-2">{searchResponse?.length} results</h5>
                </div>
              </div>
            )}
            {searchResponse?.length > 0 && (
              <div>
                <div class=" mt-4 py-1 d-flex justify-content-end ">
                  <div className="mx-2">
                    <p class="mb-0 ">
                      {/* <h5 className="px-2 ">Show Map</h5> */}
                      <strong> Show Map</strong>
                    </p>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      checked={showMap}
                      class="form-check-input "
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      onChange={(e) => setShowMap(e.target.checked)} // Update showMap state on switch change
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center">
            {searchResponse?.length === 0 && <NoDataFound />}
            {searchResponse?.length > 0 && (
              <SearchList searchResponse={searchResponse} showMap={showMap} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertySearch;
