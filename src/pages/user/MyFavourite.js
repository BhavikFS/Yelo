import React, { useEffect, useState } from "react";
import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar";
import "../../styles/Favourites.css";
import api from "../../api/config";
import { toast } from "react-toastify";
import NoDataFound from "../../components/common/NoDataFound";
import LoadingComponent from "../../components/common/Loading";
import FavoriteList from '../../components/user/FavoriteList'

const MyFavourite = () => {
  const [favouriteList, setFavouriteList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavouriteList = async () => {
      setLoading(true);
      try {
        const response = await api.get("/shortlisted-space-feed");
        console.log(response, 'respo')
        if (response?.data?.status === 200) {
          setFavouriteList(response?.data?.response);
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFavouriteList();
  }, []);
  return (
    <>
      <div>
        <Navbar />
        <div className="row py-5 align-items-center">
          <div className="col">
            <h4 className="mt-5 mx-3 ">My Favourites</h4>
          </div>
        </div>
        <div class="container">
          <div class="row">
          {!loading && favouriteList?.length === 0 && <NoDataFound />}
          {loading ? (
              <>
                <LoadingComponent
                  style={{ minHeight: "50vh" }}
                  className="d-flex justify-content-center align-items-center"
                />
              </>
            ) : (
              favouriteList?.length > 0 && (
                <>
                  <FavoriteList
                    list={favouriteList}
                  />
                </>
              )
            )}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "100px" }}></div>{" "}
      <Footer />
    </>
  );
};

export default MyFavourite;
