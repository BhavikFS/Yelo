import Navbar from "../../layouts/Navbar";
import "../../assets/css/profile.css";
import api from "../../api/config";
import { useEffect, useState } from "react";
import ProviderListHeader from "../../components/provider/ProviderListHeader";
import ProviderListing from "../../components/provider/ProviderListing";
import NoDataFound from "../../components/common/NoDataFound";
import LoadingComponent from "../../components/common/Loading";
import { ToastContainer, toast } from "react-toastify";

const ProviderItems = () => {
  const [loading, setLoading] = useState(true);
  const [spaceFeedList, setSpaceFeedList] = useState([]);

  const fetchProviderListing = async () => {
    setLoading(true);
    try {
      const response = await api.get("/provider-space-feeds");
      console.log(response, "response");
      if (response.status === 200) {
        setSpaceFeedList(response?.data?.response);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviderListing();
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div
        className="container-fluid border-bottom"
        style={{ paddingTop: "70px" }}
      >
        <ProviderListHeader />
      </div>

      <div className="container-fluid  mt-3">
        <div className="row g-4 p-2">
          {!loading && spaceFeedList?.length === 0 && <NoDataFound />}
          {loading ? (
            <LoadingComponent
              style={{ minHeight: "50vh" }}
              className="d-flex justify-content-center align-items-center"
            />
          ) : (
            spaceFeedList?.length > 0 && (
              <ProviderListing spaceFeedList={spaceFeedList} />
            )
          )}
        </div>
      </div>
    </>
  );
};
export default ProviderItems;
