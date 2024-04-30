import React, { useState } from "react";
import { PROVIDER_SIDEBAR_MENUS } from "../constants/constants";
import { useFormContext } from "../context/FormContext";

const ProviderSidebar = ({ activeMenu, setActiveMenu }) => {
  const { formData } = useFormContext();
  return (
    <>
      <div className="col-md-3 add-business-sidebar p-0">
        <div
          className={`menu-item ${
            activeMenu === PROVIDER_SIDEBAR_MENUS.PROPERTY_BASIC ? "active" : ""
          }`}
          onClick={() => setActiveMenu(PROVIDER_SIDEBAR_MENUS.PROPERTY_BASIC)}
        >
          Property Basic
        </div>
        <hr className="menu-item-section" />
        <div
          className={`menu-item ${
            activeMenu === PROVIDER_SIDEBAR_MENUS.PROPERTY_DESCRIPTION
              ? "active"
              : ""
          }`}
          style={{ pointerEvents: !formData?.propertyBasic ? "none" : "auto" }}
          onClick={() =>
            setActiveMenu(PROVIDER_SIDEBAR_MENUS.PROPERTY_DESCRIPTION)
          }
        >
          Property Description
        </div>
        <hr className="menu-item-section" />
        <div
          className={`menu-item ${
            activeMenu === PROVIDER_SIDEBAR_MENUS.IMAGES_VIDEOS ? "active" : ""
          }`}
          style={{ pointerEvents: !formData?.propertyDetails ? "none" : "auto" }}
          onClick={() => setActiveMenu(PROVIDER_SIDEBAR_MENUS.IMAGES_VIDEOS)}
        >
          Images/Videos
        </div>
        <hr className="menu-item-section" />
      </div>
    </>
  );
};

export default ProviderSidebar;
