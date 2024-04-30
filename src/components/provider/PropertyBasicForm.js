import React, { useEffect, useState } from "react";
import api from "../../api/config";
import { useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete from "./AddressAutoComplete";
import { PROVIDER_SIDEBAR_MENUS } from "../../constants/constants";
import { validateBasicPropertyDetails } from "../../validators/providers/AddBusiness";
import { useFormContext } from "../../context/FormContext";

const PropertyBasicForm = ({ setActiveMenu }) => {
  const { formData, setFormData } = useFormContext();
  const initialAddress = formData?.propertyBasic
  const [propertyTypeList, setPropertyTypeList] = useState([]);
  const [propertySubTypeList, setPropertySubTypeList] = useState([]);
  const [loadingPropertyType, setLoadingPropertyType] = useState(false);
  const [loadingPropertySubType, setLoadingPropertySubType] = useState(false);
  const [selectedCategoryID, setSelectedCategoryID] = useState(formData?.propertyBasic?.categoryId || null);
  const [selectedSubCategoryID, setSelectedSubCategoryID] = useState(formData?.propertyBasic?.subCategoryId || null);
  const [address, setAddress] = useState({
    city: initialAddress?.city,
    state: initialAddress?.state,
    pincode: initialAddress?.pin,
  } || null);
  const [selected, setSelected] = useState(null);
  const [propertyName, setPropertyName] = useState(formData?.propertyBasic?.name || "");
  const [address2, setAddress2] = useState(formData?.propertyBasic?.address2 || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    category: "",
    subCategory: "",
    propertyName: "",
    streetAddress: "",
    city: "",
    state: "",
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCmYRzM9CMuVD0C0xkQP6Vt9VyVcfMKQ2o",
    libraries: ["places"],
  });

  const handleChange = (e) => {
    setPropertyName(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress2(e.target.value);
  };

  const fetchCategories = async () => {
    setLoadingPropertyType(true);
    try {
      const propertyCategory = await api.get("/property-category");
      setPropertyTypeList(propertyCategory.data.response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPropertyType(false);
    }
  };

  const fetchSubCategories = async () => {
    setLoadingPropertySubType(true);
    let propertySubCategory;
    try {
      if (selectedCategoryID) {
        if (selectedCategoryID) {
          propertySubCategory = await api.get(
            `/property-sub-category/${selectedCategoryID}`
          );
        }
        setPropertySubTypeList(propertySubCategory.data.response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPropertySubType(false);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategoryID(event.target.value);
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategoryID(event.target.value);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, [selectedCategoryID]);

  useEffect(() => {
    if (isSubmitting) {
      validateForm();
    }
  }, [selectedCategoryID, selectedSubCategoryID, address, propertyName]);

  const validateForm = () => {
    const newErrors = {
      category: validateBasicPropertyDetails(selectedCategoryID, "category"),
      subCategory: validateBasicPropertyDetails(
        selectedSubCategoryID,
        "subCategory"
      ),
      propertyName: validateBasicPropertyDetails(propertyName, "propertyName"),
      streetAddress: validateBasicPropertyDetails(
        address?.street,
        "streetAddress"
      ),
      city: validateBasicPropertyDetails(address?.city, "city"),
      state: validateBasicPropertyDetails(address?.state, "state"),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };


  const handleSubmit = () => {
    setIsSubmitting(true);
    const isFormValid = validateForm();
    if (isFormValid) {
      setIsSubmitting(false);
      setFormData({
        ...formData,
        propertyBasic: {
          categoryId: selectedCategoryID,
          subCategoryId: selectedSubCategoryID,
          name: propertyName,
          address1: address?.street,
          address2: address2,
          city: address?.city,
          state: address?.state,
          pin: address?.pincode,
          latitude: selected?.lat,
          longitude: selected?.lng,
        },
      });
      setActiveMenu(PROVIDER_SIDEBAR_MENUS.PROPERTY_DESCRIPTION);
    }
  };

  return (
    <>
      <div className="col-md-9 ">
        <div className="m-5">
          <div className="card">
            <div className="card-body pb-0">
              <div class="form-group">
                <label className="form-label" for="formGroupExampleInput">
                  Property Type<span className="text-danger">*</span>
                </label>
                <select
                  disabled={loadingPropertyType ? true : false}
                  class="form-select"
                  value={
                    selectedCategoryID
                  }
                  onChange={handleCategoryChange}
                >
                  <option value="">Select</option>
                  {propertyTypeList.map((item) => (
                    <option key={item.categoryId} value={item.categoryId}>
                      {item.category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="text-danger">{errors.category}</div>
                )}
              </div>
              <div class="form-group">
                <label className="form-label" for="formGroupExampleInput">
                  Property Sub Type<span className="text-danger">*</span>
                </label>
                <select
                  class="form-select"
                  disabled={loadingPropertySubType ? true : false}
                  value={
                    selectedSubCategoryID}
                  onChange={handleSubCategoryChange}
                >
                  <option value="">Select</option>
                  {propertySubTypeList.map((item) => (
                    <option key={item.subCategoryId} value={item.subCategoryId}>
                      {item.subCategory}
                    </option>
                  ))}
                </select>
                {errors.subCategory && (
                  <div className="text-danger">{errors.subCategory}</div>
                )}
              </div>
              <div class="form-group">
                <label className="form-label" for="formGroupExampleInput2">
                  Property Name<span className="text-danger">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={propertyName}
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Property Name"
                />
                {errors.propertyName && (
                  <div className="text-danger">{errors.propertyName}</div>
                )}
              </div>
              <label className="mt-4 form-label-heading" for="formGroupExampleInput">
                Address
              </label>
            </div>
            <hr className="mr-0" />
            <div className="card-body pt-0">
              <div class="form-group">
                <label className="form-label" for="formGroupExampleInput2">
                  Street Address<span className="text-danger">*</span>
                </label>
                <PlacesAutocomplete
                  isLoaded={isLoaded}
                  setFormData={setAddress}
                  setSelected={setSelected}
                />
                {errors.streetAddress && (
                  <div className="text-danger">{errors.streetAddress}</div>
                )}
              </div>
              <div class="row">
                <div class="form-group col-md-5">
                  <label className="form-label" for="streetaddress2">Street Address Line 2</label>
                  <input
                    type="text"
                    value={address2}
                    onChange={handleChangeAddress}
                    class="form-control"
                    id="streetaddress2"
                    placeholder="Street Address 2"
                  />
                </div>
                <div class="form-group col-md-5">
                  <label className="form-label" for="zipcode">Zipcode</label>
                  <input
                    type="text"
                    class="form-control"
                    id="zipcode"
                    readOnly
                    value={address?.pincode}
                    placeholder="Zipcode"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-5">
                  <label className="form-label" for="city">
                    City<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={address?.city}
                    class="form-control"
                    id="city"
                    placeholder="City"
                  />
                  {errors.city && (
                    <div className="text-danger">{errors.city}</div>
                  )}
                </div>
                <div class="form-group col-md-5">
                  <label className="form-label" for="state">
                    State<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={address?.state}
                    class="form-control"
                    id="state"
                    placeholder="State"
                  />
                  {errors.state && (
                    <div className="text-danger">{errors.state}</div>
                  )}
                </div>
              </div>
              <button  type="button" className="mt-3 primary-btn" onClick={handleSubmit}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyBasicForm;
