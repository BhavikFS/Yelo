import { useCallback, useEffect } from "react";

import { AsyncPaginate } from "react-select-async-paginate";

import { loadOptions } from "../../utils/loadOptions";

const AsyncPaginateDropdown = ({ value, onChange, className, searchPayload, setSearchPayload }) => {
  const wrappedLoadOptions = useCallback((...args) => {
    return loadOptions(...args);
  }, []);

  console.log(value, "value")

  useEffect(()=>{
    if(!!value){
        setSearchPayload({...searchPayload, location:value?.value})
    }
  },[value])

  return (
    <AsyncPaginate
      className={className}
      debounceTimeout={300}
      placeholder="Enter Your location"
      value={value}
      loadOptions={wrappedLoadOptions}
      onChange={onChange}
    />
  );
};

export default AsyncPaginateDropdown;
