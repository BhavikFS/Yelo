import React from "react";

const SearchAccordion = ({ icon, style, index, accordionId, title, data }) => {
  console.log(data, 'my-search')
  return (
    <>
      <div className="w-75">
        <div class="accordion" id={accordionId}>
          <div class="accordion-item">
            <h2 class="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
              >
                <img src={icon} style={style} />
                {title}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              class="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent={`#${accordionId}`}
            >
              <div class="accordion-body">
                {!!data &&
                  data?.map((item, index) => (
                    <>
                      <span
                        key={index}
                        class="badge rounded-pill bg-transparent text-dark p-2 shadw mx-2"
                      >
                        {item?.category && item?.category}
                      </span>
                      <span
                        key={index}
                        class="badge rounded-pill bg-transparent text-dark p-2 shadw mx-2"
                      >
                        {item?.subCategory && item?.subCategory}
                      </span>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAccordion;
