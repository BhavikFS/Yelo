import React, { useEffect, useState } from "react";
import api from "../../api/config";
import Ratings from "../../assets/images/Ratings.png";
import Search from "../../assets/images/Search.png";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import { toast } from "react-toastify";
import SearchAccordion from "./SearchAccordion";
import LoadingComponent from "../common/Loading";
import { useNavigate } from "react-router-dom";
import AsyncPaginateDropdown from "../common/AsyncPaginate";

const onAction = (node, action) => {
  console.log("onAction::", action, node);
};
const onNodeToggle = (currentNode) => {
  console.log("onNodeToggle::", currentNode);
};
const SpaceFeedSearch = ({
  categoryList,
  searchLoading,
  setSearchLoading,
  setCategoryList,
  setSearchPayload,
  searchPayload,
}) => {
  const [searchTrendingList, setSearchTrendingList] = useState([]);
  const [mySearchList, setMySearchList] = useState([]);
  const [loadingPropertyType, setLoadingPropertyType] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [value, onChange] = useState(null);
  console.log(selectedCategories, "sele");

  const navigate = useNavigate();

  let auth = localStorage?.getItem("data");
  auth = JSON?.parse(auth);

  useEffect(() => {
    const fetchMySearch = async () => {
      try {
        const response = await api.get("/user-search-history");
        if (response?.data?.status === 200) {
          setMySearchList(response?.data?.response);
        }
      } catch (error) {
        console.log(error, "Something went wrong");
      }
    };

    fetchMySearch();
  }, []);

  useEffect(() => {
    const fetchTrendSearch = async () => {
      try {
        const response = await api.get("/search-trending");
        if (response?.data?.status === 200) {
          setSearchTrendingList(response?.data?.response);
        }
      } catch (error) {
        console.log(error, "Something went wrong");
      }
    };

    fetchTrendSearch();
  }, []);

  console.log(searchTrendingList, "searchTren");

  const fetchCategories = async () => {
    setLoadingPropertyType(true);
    try {
      const propertyCategory = await api.get("/property-category");
      setCategoryList(propertyCategory.data.response);
    } catch (error) {
      toast.error("Error fetching categories");
      console.log(error);
    } finally {
      setLoadingPropertyType(false);
    }
  };

  const onChangeCat = (currentNode, selectedNodes) => {
    if (currentNode._depth === 0) {
      const categoryId = currentNode.value.replace("cat_", "");

      if (currentNode.checked) {
        setSelectedCategories((prevSelectedCategories) => [
          ...prevSelectedCategories,
          categoryId,
        ]);
        // Add subcategory IDs of the matched category from setCategoryList
        const matchedCategory = categoryList.find(
          (category) =>
            category.categoryId == currentNode.value.replace("cat_", "")
        );
        if (matchedCategory) {
          const matchedSubCategoryIds =
            matchedCategory.propertySubCategories.map(
              (subcategory) => subcategory.subCategoryId
            );
          // Push the matched subcategory IDs into selectedSubCategories
          setSelectedSubCategories((prevSubCategories) => {
            return [
              ...new Set([...prevSubCategories, ...matchedSubCategoryIds]),
            ];
          });
        }
      } else {
        setSelectedCategories((prevSelectedCategories) =>
          prevSelectedCategories.filter((id) => id !== categoryId)
        );
        setSelectedSubCategories((prevSubCategories) =>
          prevSubCategories.filter(
            (subCategoryId) =>
              !categoryList
                .find((category) => category.categoryId == categoryId)
                ?.propertySubCategories.some(
                  (subcategory) => subcategory.subCategoryId === subCategoryId
                )
          )
        );
      }
    } else if (currentNode._depth === 1) {
      // Handle subcategory selection
      const subCategoryId = currentNode.value.replace("subcat_", "");

      // Find the category ID based on the selected subcategory ID
      const categoryId = categoryList.find((category) =>
        category.propertySubCategories.some(
          (subcategory) => subcategory.subCategoryId == subCategoryId
        )
      )?.categoryId;

      console.log(categoryId, "categoryId", subCategoryId);
      if (currentNode.checked) {
        // Add subcategory to selectedSubCategories
        setSelectedSubCategories((prevSubCategories) => [
          ...prevSubCategories,
          subCategoryId,
        ]);

        // Add category to selectedCategories if not already present
        if (!selectedCategories.includes(categoryId)) {
          setSelectedCategories((prevSelectedCategories) => [
            ...prevSelectedCategories,
            categoryId,
          ]);
        }
      } else {
        // Remove subcategory from selectedSubCategories
        setSelectedSubCategories((prevSubCategories) =>
          prevSubCategories.filter((id) => id != subCategoryId)
        );

        // Check if all subcategories of the parent category are unchecked, if so, remove the category from selectedCategories
        const category = categoryList.find(
          (category) => category.categoryId == categoryId
        );
        if (category) {
          const allSubCategoriesUnchecked =
            category.propertySubCategories.every(
              (subcategory) =>
                !selectedNodes.find(
                  (node) =>
                    node.value == `subcat_${subcategory.subCategoryId}` &&
                    node.checked
                )
            );
          if (allSubCategoriesUnchecked) {
            setSelectedCategories((prevSelectedCategories) =>
              prevSelectedCategories.filter((id) => id != categoryId)
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    if (!!auth?.jwt) {
      fetchCategories();
    }
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0 || selectedSubCategories.length > 0) {
      setSearchPayload({
        ...searchPayload,
        category: selectedCategories?.map((item) => parseInt(item)),
        subCategory: selectedSubCategories,
      });
    }
  }, [selectedCategories, selectedSubCategories]);

  const handleSubmit = async () => {
      setSearchLoading(true);
      try {
        const response = await api.post("/search-space-feed", searchPayload);
        if (response?.data?.status === 200) {
          navigate("/property-search", {
            state: { searchData: response.data },
          });
        }
        console.log(response, "response");
        // setSpaceFeedList() Will  be used to update the state of space feed list in parent component
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error, "error");
      } finally {
        setSearchLoading(false);
      }
  };

  const convertedData = categoryList.map((item) => ({
    label: item?.category,
    value: "cat_" + item?.categoryId,
    children: item?.propertySubCategories?.map((subCategory) => ({
      label: subCategory?.subCategory,
      value: "subcat_" + subCategory?.subCategoryId,
      checked: selectedSubCategories.some(
        (selectedId) =>
          parseInt(selectedId, 10) === parseInt(subCategory.subCategoryId, 10)
      ),
    })),
    checked: selectedCategories.some(
      (selectedId) => parseInt(selectedId, 10) === parseInt(item.categoryId, 10)
    ),
    expanded: true, // initially collapsed, adjust as needed
  }));

  return (
    <>
      <div className="search-section">
        <div className="subsection w-75">
          <div className="inner-section">
            <span className="text-secondary fw-bold px-1">
              What are you looking for?
            </span>
            <DropdownTreeSelect
              disabled={loadingPropertyType ? true : false}
              texts={{ placeholder: "Select Your Activity" }}
              data={convertedData}
              onChange={onChangeCat}
              onAction={onAction}
              onNodeToggle={onNodeToggle}
              keepTreeOnSearch={false} // check if this needs to be true
              showPartiallySelected={true} // helps in showing partially selected nodes
              className=""
            />
          </div>
          <div className="inner-section">
            <span className="text-secondary fw-bold">Where</span>
            <AsyncPaginateDropdown
              searchPayload={searchPayload}
              setSearchPayload={setSearchPayload}
              value={value}
              onChange={onChange}
            />
            {/* <input
              type="text"
              className="border-0 bg-transparent p-0 py-2"
              placeholder="Enter Your location"
              value={searchPayload.location}
              onChange={handleLocationChange}
            /> */}
          </div>
          <div className="inner-section">
            <button
              onClick={handleSubmit}
              type="button"
              disabled={searchLoading ? true : false}
              className="bg-dark px-5"
            >
              {searchLoading ? (
                <LoadingComponent className="d-flex justify-content-center align-items-center" />
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
        <SearchAccordion
          icon={Search}
          index="One"
          style={{ marginRight: "10px" }}
          title="My Searches"
          accordionId="accordionExample"
          data={mySearchList}
        />
        <SearchAccordion
          icon={Ratings}
          index="Three"
          style={{ marginRight: "10px" }}
          title="Trending Searches"
          accordionId="accordionExample1"
          data={searchTrendingList}
        />
      </div>
    </>
  );
};

export default SpaceFeedSearch;
