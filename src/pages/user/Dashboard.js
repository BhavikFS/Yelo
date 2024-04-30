import React, { useEffect, useRef, useState } from "react";
import "../../styles/Dashboard.css";
import Footer from "../../layouts/Footer";
import mainImg from "../../assets/bussniss.png";
import icon1 from "../../assets/Complaint.png";
import icon2 from "../../assets/Exterior.png";
import icon3 from "../../assets/Hotel Star.png";
import icon4 from "../../assets/Office.png";
import Navbar from "../../layouts/Navbar";
import api from "../../api/config";
import LoadingComponent from "../../components/common/Loading";
import NoDataFound from "../../components/common/NoDataFound";
import UserSpaceFeedList from "../../components/user/UserSpaceFeedList";
import SpaceFeedSearch from "../../components/user/SpaceFeedSearch";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [spaceFeedList, setSpaceFeedList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [searchPayload, setSearchPayload] = useState({
    category: [],
    subCategory: [],
    location: "",
  });
  const [searchLoading, setSearchLoading] = useState(false);
  console.log(searchPayload, "searchLoading");

  const fetchData = async (page) => {
    console.log(page, "page");
    const response = await api.get(`/space-feeds?page=${page}&size=5`);
    console.log(response, "response");
    return response?.data?.response?.spaceFeeds;
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const newProducts = await fetchData(page);
      if (newProducts.length === 0) {
        setHasMore(false);
      }
      setSpaceFeedList([...spaceFeedList, ...newProducts]);
      setPage(page + 1);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="">
        <div className="main-img">
          <img
            className="img-fluid"
            style={{ width: "100%" }}
            src={mainImg}
            alt="Business Meeting"
          />
          <SpaceFeedSearch
            setSpaceFeedList={setSpaceFeedList}
            searchLoading={searchLoading}
            setSearchLoading={setSearchLoading}
            categoryList={categoryList}
            subCategoryList={subCategoryList}
            setCategoryList={setCategoryList}
            setSubCategoryList={setSubCategoryList}
            setSearchPayload={setSearchPayload}
            searchPayload={searchPayload}
          />
        </div>
        <div className="container-fluid">
          <div className="mx-3 mt-4">
            <h3>Our Business</h3>
            {!loading && spaceFeedList?.length === 0 && <NoDataFound />}
            {loading && page === 0 ? (
              <>
                <LoadingComponent
                  style={{ minHeight: "50vh" }}
                  className="d-flex justify-content-center align-items-center"
                />
              </>
            ) : (
              spaceFeedList?.length > 0 && (
                <>
                  <UserSpaceFeedList
                    spaceFeedList={spaceFeedList}
                    loadMore={loadMore}
                    hasMore={hasMore}
                  />
                </>
              )
            )}
          </div>
        </div>

        <div className="rows">
          <div className="icon-cards">
            <img src={icon1} alt="Business Meeting" />
          </div>
          <div className="icon-cards">
            <img src={icon2} alt="Business Meeting" />
          </div>
          <div className="icon-cards">
            <img src={icon3} alt="Business Meeting" />
          </div>
          <div className="icon-cards">
            <img src={icon1} alt="Business Meeting" />
          </div>
          <div className="icon-cards">
            <img src={icon4} alt="Business Meeting" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
