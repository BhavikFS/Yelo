import React, { useEffect, useState } from "react";
import { PROVIDER_SIDEBAR_MENUS } from "../../constants/constants";
import { validatePropertyDescriptionForm } from "../../validators/providers/AddBusiness";
import { useFormContext } from "../../context/FormContext";

const PropertyDescriptionForm = ({ setActiveMenu }) => {
  const { formData, setFormData } = useFormContext();
  const [descriptionFormData, setDescriptionFormData] = useState({
    price: formData?.propertyDetails?.price || "",
    rent: formData?.propertyDetails?.rent || "",
    totalSpace: formData?.propertyDetails?.totalSpace || "",
    availableSpace: formData?.propertyDetails?.availableSpace || "",
    minAvailableSpace: formData?.propertyDetails?.minAvailableSpace || "",
    businessType: formData?.propertyDetails?.businessType || "",
    subBusinessType: formData?.propertyDetails?.subBusinessType || "",
    remainingLeaseTerm: formData?.propertyDetails?.remainingLeaseTerm || "",
    minSubLeaseTerm: formData?.propertyDetails?.minSubLeaseTerm || "",
    layout: formData?.propertyDetails?.layout || "",
    parking: formData?.propertyDetails?.parking || "",
    description: formData?.propertyDetails?.description || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    price: "",
    rent: "",
    totalSpace: "",
    availableSpace: "",
    minAvailableSpace: "",
    businessType: "",
    subBusinessType: "",
    remainingLeaseTerm: "",
    minSubLeaseTerm: "",
    layout: "",
    parking: "",
    description: "",
  });

  const handleChange = (e) => {
    setDescriptionFormData({
      ...descriptionFormData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isSubmitting) {
      validateForm();
    }
  }, [descriptionFormData]);

  const validateleaseFields = () => {
    if (
      Number(descriptionFormData.minSubLeaseTerm) >
      Number(descriptionFormData.remainingLeaseTerm)
    ) {
      return "Cannot be greater than remaining lease term";
    }
    return "";

  };

  const validateOtherFields = () => {
    if (
      descriptionFormData.availableSpace !== "" &&
      descriptionFormData.minAvailableSpace !== ""
    ) {
      if (
        Number(descriptionFormData.minAvailableSpace) >
        Number(descriptionFormData.availableSpace)
      ) {
        return "Min available space cannot be greater than max available space";
      }
    }
    if (
      descriptionFormData.minAvailableSpace !== "" &&
      descriptionFormData.availableSpace !== "" &&
      descriptionFormData.totalSpace !== ""
    ) {
      if (
        Number(descriptionFormData.minAvailableSpace) >
          Number(descriptionFormData.totalSpace) ||
        Number(descriptionFormData.availableSpace) >
          Number(descriptionFormData.totalSpace)
      ) {
        return "Cannot be greater than total space";
      }
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      price: validatePropertyDescriptionForm(
        descriptionFormData.price,
        "price"
      ),
      rent: validatePropertyDescriptionForm(descriptionFormData.rent, "rent"),
      totalSpace: validatePropertyDescriptionForm(
        descriptionFormData.totalSpace,
        "totalSpace"
      ),
      availableSpace: validatePropertyDescriptionForm(
        descriptionFormData.availableSpace,
        "availableSpace"
      ),
      minAvailableSpace: validatePropertyDescriptionForm(
        descriptionFormData.minAvailableSpace,
        "minAvailableSpace"
      ),
      remainingLeaseTerm: validatePropertyDescriptionForm(
        descriptionFormData.remainingLeaseTerm,
        "remainingLeaseTerm"
      ),
      minSubLeaseTerm: validatePropertyDescriptionForm(
        descriptionFormData.minSubLeaseTerm,
        "minSubLeaseTerm"
      ),
      businessType: validatePropertyDescriptionForm(
        descriptionFormData.businessType,
        "businessType"
      ),
      subBusinessType: validatePropertyDescriptionForm(
        descriptionFormData.subBusinessType,
        "subBusinessType"
      ),
      layout: validatePropertyDescriptionForm(
        descriptionFormData.layout,
        "layout"
      ),
      parking: validatePropertyDescriptionForm(
        descriptionFormData.parking,
        "parking"
      ),
      description: validatePropertyDescriptionForm(
        descriptionFormData.description,
        "description"
      ),
    };

    newErrors.minAvailableSpace = validateOtherFields();
    newErrors.availableSpace = validateOtherFields();
    newErrors.minAvailableSpace = validateOtherFields();
    newErrors.minSubLeaseTerm = validateleaseFields();

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };
  console.log(errors, '00')

  const handleSubmit = () => {
    setIsSubmitting(true);
    const isFormValid = validateForm();
    console.log(isFormValid, 'isForm')
    if (isFormValid) {
      setIsSubmitting(false);
      setFormData({
        ...formData,
        propertyDetails: {
          price: descriptionFormData.price,
          rent: descriptionFormData.rent,
          totalSpace: descriptionFormData.totalSpace,
          availableSpace: descriptionFormData.availableSpace,
          minAvailableSpace: descriptionFormData.minAvailableSpace,
          remainingLeaseTerm: descriptionFormData.remainingLeaseTerm,
          minSubLeaseTerm: descriptionFormData.minSubLeaseTerm,
          businessType: descriptionFormData.businessType,
          subBusinessType: descriptionFormData.subBusinessType,
          layout: descriptionFormData.layout,
          parking: descriptionFormData.parking,
          description: descriptionFormData.description,
        },
      });
      setActiveMenu(PROVIDER_SIDEBAR_MENUS.IMAGES_VIDEOS);
    }
  };
  return (
    <>
      <div className="col-md-9">
        <div className="m-5">
          <div class="card">
            <div class="card-header">
              <h5 className="bold">Property Details</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="form-group col-md-4 col-sm-12 ">
                  <label for="Price/SQFT">
                    Price/SQFT<span className="text-danger">*</span>
                  </label>
                  <input
                    name="price"
                    onChange={handleChange}
                    value={descriptionFormData.price}
                    type="number"
                    class="form-control"
                    id="Price/SQFT"
                    placeholder="Enter Price/SQFT"
                  />
                  {errors.price && (
                    <div className="text-danger">{errors.price}</div>
                  )}
                </div>
                <div class="form-group col-md-4 col-sm-12">
                  <label for="rentfee">
                    Total Rent Fee + Other Costs
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="rent"
                    onChange={handleChange}
                    value={descriptionFormData.rent}
                    class="form-control"
                    id="rentfee"
                    placeholder="Enter  Total Rent Fee + Other Costs"
                  />
                  {errors.rent && (
                    <div className="text-danger">{errors.rent}</div>
                  )}
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-4 col-sm-12 ">
                  <label for="total/SQFT">
                    Total SQFT<span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="totalSpace"
                    onChange={handleChange}
                    value={descriptionFormData.totalSpace}
                    class="form-control"
                    id="total/SQFT"
                    placeholder="Enter  Total SQFT"
                  />
                  {errors.totalSpace && (
                    <div className="text-danger">{errors.totalSpace}</div>
                  )}
                </div>
                <div class="form-group col-md-3 col-sm-12">
                  <label for="availableSqft">
                    Available SQFT<span className="text-danger">*</span>
                  </label>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <input
                      type="number"
                      name="availableSpace"
                      value={descriptionFormData.availableSpace}
                      onChange={handleChange}
                      class="form-control"
                      id="availableSqft"
                      placeholder="Max"
                    />
                    <input
                      type="number"
                      name="minAvailableSpace"
                      style={{ marginLeft: "15px" }}
                      value={descriptionFormData.minAvailableSpace}
                      onChange={handleChange}
                      class="form-control"
                      id="availableSqft"
                      placeholder="Min"
                    />
                  </div>
                  {errors.availableSpace && (
                    <div className="text-danger">
                      {errors.availableSpace || errors.minAvailableSpace}
                    </div>
                  )}
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-4 col-sm-12 ">
                  <label for="leaseTerm">
                    Remaining Lease Term
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="remainingLeaseTerm"
                    value={descriptionFormData.remainingLeaseTerm}
                    onChange={handleChange}
                    class="form-control"
                    id="leaseTerm"
                    placeholder="Enter Remaining Lease Term"
                  />
                  {errors.remainingLeaseTerm && (
                    <div className="text-danger">
                      {errors.remainingLeaseTerm}
                    </div>
                  )}
                </div>
                <div class="form-group col-md-3 col-sm-12">
                  <label for="minimumLease">
                    Minimum Sub Lease Term
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={descriptionFormData.minSubLeaseTerm}
                    name="minSubLeaseTerm"
                    class="form-control"
                    id="minimumLease"
                    placeholder="Enter Minimum Sub Lease Term"
                  />
                  {errors.minSubLeaseTerm && (
                    <div className="text-danger">{errors.minSubLeaseTerm}</div>
                  )}
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-4 col-sm-12">
                  <label for="businessType">
                    Business Type
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessType"
                    value={descriptionFormData.businessType}
                    onChange={handleChange}
                    class="form-control"
                    id="businessType"
                    placeholder="Enter Business Type"
                  />
                </div>
                {errors.businessType && (
                  <div className="text-danger">{errors.businessType}</div>
                )}
                <div class="form-group col-md-3 col-sm-12">
                  <label for="desiredLeaseType" class="single-line-label">
                    Desired Sub Lease Buisness Type
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="subBusinessType"
                    value={descriptionFormData.subBusinessType}
                    onChange={handleChange}
                    class="form-control w-100"
                    id="desiredLeaseType"
                    placeholder="Enter Desired Sub Lease Buisness Type"
                  />
                </div>
                {errors.subBusinessType && (
                  <div className="text-danger">{errors.subBusinessType}</div>
                )}
              </div>
              <div class="row">
                <div class="form-group col-md-4 col-sm-12 ">
                  <label for="Layout">
                    Layout<span className="text-danger">*</span>
                  </label>
                  <input
                    name="layout"
                    value={descriptionFormData.layout}
                    onChange={handleChange}
                    type="text"
                    class="form-control"
                    id="Layout"
                    placeholder="Enter Layout Value"
                  />
                  {errors.layout && (
                    <div className="text-danger">{errors.layout}</div>
                  )}
                </div>
                <div class="form-group col-md-3 col-sm-12">
                  <label for="Parking">
                    Parking<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={descriptionFormData.parking}
                    name="parking"
                    class="form-control"
                    id="Parking"
                    placeholder="Enter Parking Value"
                  />
                  {errors.parking && (
                    <div className="text-danger">{errors.parking}</div>
                  )}
                </div>
              </div>

              <div className="row">
                <div class="form-group col-md-9 col-sm-12 ">
                  <label for="Layout">
                    Description<span className="text-danger">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={descriptionFormData.description}
                    onChange={handleChange}
                    placeholder=" Enter Description"
                    className="form-control"
                    rows={7}
                  />
                  {errors.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-end descriptionButton">
                <button
                  // className="mt-3"
                  type="button"
                  className="primary-btn"
                  onClick={handleSubmit}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDescriptionForm;
