const validateBasicPropertyDetails = (value, fieldName) => {
  console.log(value, fieldName, "oi");
  switch (fieldName) {
    case "category":
      return !value ? "Category is required" : "";
    case "subCategory":
      return !value ? "Subcategory is required" : "";
    case "propertyName":
      return !value ? "Property Name is required" : "";
    case "streetAddress":
      return !value ? "Street address is required" : "";
    case "city":
      return !value ? "City is required" : "";
    case "state":
      return !value ? "State is required" : "";
    default:
      return "";
  }
};

const validatePropertyDescriptionForm = (value, fieldName) => {
  switch (fieldName) {
    case "price":
      return !value ? "Price is required" : "";
    case "rent":
      return !value ? "Rent is required" : "";
    case "totalSpace":
      return !value ? "Total space is required" : "";
    case "availableSpace":
      return !value ? "Available space is required" : "";
      case "minAvailableSpace":
      return !value ? "Min Available space is required" : "";
    case "remainingLeaseTerm":
      return !value ? "Remaining lease term is required" : "";
    case "businessType":
      return !value ? "Business Type is required" : "";
    case "subBusinessType":
      return !value ? "Sub Business Type is required" : "";
    case "minSubLeaseTerm":
      return !value ? "Minimum sub lease term is required" : "";
    case "layout":
      return !value ? "Layout is required" : "";
    case "parking":
      return !value ? "Parking is required" : "";
    case "description":
      return !value ? "Description is required" : "";
    default:
      return "";
  }
};

const validatePropertyFilesUpload = (value, fieldName) => {
  switch (fieldName) {
    case "images":
      return !value ? "Please upload atleast one file" : "";
    default:
      return "";
  }
};

export {
  validateBasicPropertyDetails,
  validatePropertyDescriptionForm,
  validatePropertyFilesUpload,
};
