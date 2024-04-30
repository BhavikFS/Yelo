import React, { useState } from "react";
import Navbar from "../../layouts/Navbar";
import "../../styles/AddBusiness.css";
import { PROVIDER_SIDEBAR_MENUS } from "../../constants/constants";
import ProviderSidebar from "../../layouts/ProviderSidebar";
import PropertyBasicForm from "../../components/provider/PropertyBasicForm";
import PropertyDescriptionForm from "../../components/provider/PropertyDescriptionForm";
import PropertyFileUploadForm from "../../components/provider/PropertyFileUploadForm";
import { FormProvider } from "../../context/FormContext";

const ProviderBusiness = () => {
  const [activeMenu, setActiveMenu] = useState(
    PROVIDER_SIDEBAR_MENUS.PROPERTY_BASIC
  );

  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="add-business-header py-3">
        <span >Add Your Business Listing</span>

        </div>
        <hr className="add-business-section" />
        {/* <div className="container-fluid"> */}
        <FormProvider>
          <div className="row">
            <ProviderSidebar
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />

            {activeMenu === PROVIDER_SIDEBAR_MENUS.PROPERTY_BASIC && (
              <PropertyBasicForm setActiveMenu={setActiveMenu} />
            )}

            {activeMenu === "Property Description" && (
              <PropertyDescriptionForm setActiveMenu={setActiveMenu} />
            )}
            {activeMenu === "Images/Videos" && (
              <PropertyFileUploadForm setActiveMenu={setActiveMenu} />
            )}
          </div>
        </FormProvider>

        {/* </div> */}
      </main>
    </>
  );
};

export default ProviderBusiness;
