import React from "react";
import Create from "../../assets/images/add.png";
import Delete from "../../assets/images/Delete.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProviderListHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="d-flex justify-content-between p-2 mt-4 mb-1">
      <h5 className="fw-bold ">My Listings</h5>
     

      <div>
      <button
        style={{
          marginRight: "10px",
          cursor: "pointer",
          padding: "7px 14px",
          borderRadius: "5px",
          backgroundColor:  "rgba(245, 192, 0, 0.7)",
          color: "#000",
          border: "none",
          fontWeight: "400",

        }}
        
          onClick={(e) =>{
            e.preventDefault();
            navigate("/provider-business")
          }}
          
     
      >
        Add Business
      </button>
    </div>
      
    </header>
  );
};

export default ProviderListHeader;
