import React, { useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useFormContext } from "../../context/FormContext";

export default function Places({
  setFormData,
  setSelected,
  isLoaded,
}) {
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete
          setFormData={setFormData}
          setSelected={setSelected}
        />
      </div>
    </>
  );
}

const PlacesAutocomplete = ({ setFormData, setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const { formData } = useFormContext();

  useEffect(() => {
    if (formData?.propertyBasic?.address1) {
      setValue(formData.propertyBasic.address1);
    }
  }, [formData, setValue]);

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const data = await getLatLng(results[0]);
      setSelected(data);

      const addressComponents = results[0].address_components;
      let street = "",
        city = "",
        state = "",
        country = "",
        postalCode = "";

      for (const component of addressComponents) {
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number":
            street = `${component.long_name} ${street}`;
            break;
          case "route":
            street += component.long_name;
            break;
          case "locality":
            city = component.long_name;
            break;
          case "administrative_area_level_1":
            state = component.long_name;
            break;
          case "country":
            country = component.long_name;
            break;
          case "postal_code":
            postalCode = component.long_name;
            break;
          default:
            break;
        }
      }

      setFormData((p) => ({
        ...p,
        city: city || "",
        state: state || "",
        country: country || "",
        pincode: postalCode || "",
        street: address || "",
      }));
    } catch (error) {
      console.error("Error: ", error);
    }
  };


  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input form-control"
        placeholder="Search an address"
      />
      <ComboboxPopover style={{ zIndex: "9999" }} portal={false}>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
