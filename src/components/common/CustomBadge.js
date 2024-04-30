import React from "react";

const CustomBadge = ({ categoryList, searchPayload, setSearchPayload }) => {
  const handleBadgeClick = (categoryId) => {
    const index = searchPayload?.category?.indexOf(categoryId); // Check the index of selected categoryID in searchPayload category
    if (index === -1) {
      // If ID is not in category key in searchPayload
      console.log("first");
      setSearchPayload((prevPayload) => ({
        ...prevPayload,
        category: [...prevPayload.category, categoryId],
      }));
    } else {
      // It will remove id if it is already in searchPayload
      setSearchPayload((prevPayload) => ({
        ...prevPayload,
        category: prevPayload.category.filter((item) => item !== categoryId),
      }));
    }
  };

  return (
    <div class="badge-container">
      <>
        {categoryList?.map((item) => (
          <span
            className={`badge rounded-pill text-bg-primary ${
              searchPayload?.category?.includes(item?.categoryId)
                ? "selected"
                : ""
            }`}
            onClick={() => handleBadgeClick(item?.categoryId)}
          >
            {item?.category}
          </span>
        ))}
      </>
    </div>
  );
};

export default CustomBadge;
