import React, { useEffect, useState } from "react";
import UploadIcon from "../../assets/images/UploadIcon.png";
import api from "../../api/config";
import { useFormContext } from "../../context/FormContext";
import { validatePropertyFilesUpload } from "../../validators/providers/AddBusiness";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const PropertyFileUploadForm = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    images: "",
  });

  const navigate = useNavigate();

  const { formData, setFormData } = useFormContext();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  useEffect(() => {
    if (isSubmitting) {
      validateForm();
    }
  }, [images]);

  const validateForm = () => {
    const newErrors = {
      images: validatePropertyFilesUpload(images.length > 0, "images"),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setIsSubmitting(true);
    const isFormValid = validateForm();
    if (isFormValid) {
      setIsSubmitting(false);
      setFormData({
        ...formData,
      });
      const formDatas = new FormData();
      formDatas.append("data", JSON.stringify(formData));
      images.forEach((image, index) => {
        formDatas.append(`files`, image);
      });
      try {
        const response = await api.post("/create-space-feed", formDatas);
        if (response.status === 200) {
          toast.success("Submitted Successfully");
          setTimeout(() => {
            navigate("/provider-listing");
          }, 2000);
        }
      } catch (error) {
        console.log(error, "error");
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="col-md-9">
        <ToastContainer />
        <div className="m-5">
          <div class="card">
            <div class="card-header">
              <h5 className="bold">Property Details</h5>
            </div>
            <div class="card-body">
              <span>Photos and Videos</span>
              <br />
              <span>
                Click below to upload photos and videos. Media will display in
                order
              </span>

              <div className="container d-flex justify-content-center w-100">
                <div className="filed">
                  <div className="upload-part m-5">
                    <div className="form-group file-area">
                      <input
                        type="file"
                        name="images"
                        id="images"
                        required="required"
                        accept="image/png,image/jpeg,image/jpg,video/mp4,video/quicktime"
                        multiple // Allow multiple file selection
                        onChange={handleFileChange} // Handle file selection
                      />

                      <div className="file-dummy">
                        {images.length > 0 && (
                          <div className="success">
                            {`Great, you have selected ${images.length} files. Keep on.`}
                          </div>
                        )}
                        <div className="default">
                          <div className="image-block mb-2">
                            {/* Icon of the image Uploader */}
                            <img src={UploadIcon} alt="icon" />
                          </div>
                          <span style={{ fontWeight: "600" }}>
                            Add Photos/Videos
                          </span>{" "}
                          <br />
                          <span>Click or drag and drop to add files</span>
                        </div>
                      </div>
                    </div>
                    {errors.images && (
                      <div className="text-danger">{errors.images}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end descriptionButton">
                <button
                  disabled={loading ? true : false}
                  // className="mt-5 "
                  type="button" 
                  className="mt-5 primary-btn"
                  onClick={handleSubmit}
                >
                  Submit <span className="bold"> {">"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyFileUploadForm;