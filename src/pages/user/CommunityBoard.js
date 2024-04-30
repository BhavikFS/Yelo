import React from "react";
import Navbar from "../../layouts/Navbar";

import "../../styles/Comunity.css";

const CommunityBoard = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid ">
        <div className="row">
          <div className="row">
            <div
              className="col-9  py-5 mt-4"
              style={{ backgroundColor: "#fff", height: "100vh" }}
            >
              <div className="d-flex">
                <h5 className="mr-4 mt-4 px-2">Community Board</h5>
                <div class="form-group mr-3 position-relative ml-4 mr-4 mt-2">
                  <select
                    class="selectpicker mr-3 mt-2 ml-2 px-3 py-2"
                    id="dropdown2"
                  >
                    <option>Area</option>
                    <option>Ketchup</option>
                    <option>Relish</option>
                  </select>
                </div>

                <div class="form-group mr-3 position-relative ml-4 mr-4 px-3 mt-2">
                  <select
                    class="selectpicker mr-3 mt-2 ml-2 px-3 py-2"
                    id="dropdown2"
                  >
                    <option>Business</option>
                    <option>Ketchup</option>
                    <option>Relish</option>
                  </select>
                </div>
              </div>
              <div className="card-community mt-4 shadow-sm">
                <div className="card-body">
                  <div className="d-flex">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/cbc8/55c4/ae85c9ad569ebf472e5875557074b685?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QUzd0ywC9yhXiLZ0ztJjd3VVivc9xuCeKnjb6ph6DGV0kbJ6~FlC080ODpZTVcYHAsSt-qRQzCcR7tvvV4b9aCl1QfcnHOw8eQc6aYGTeABEgL18qSWLWe8IBpky1T1i9PTUAlLh121-NfOHPWkTvvBUa-mZ4d4xQDFnLGCQFCmcEgzUo51EUhm6rpcSXzUzDjkbOcVIX5Zkmx60GattMAqlV7DY7KmDmyPJk-Yv0np67CAQHlrITr2epYB9G3S0CHJSdWK5SN-rdf0lam-F0kDk1Dzt4ctGOUTBxLv3H78iAv4cyAXQHMyq-5Rxfa7WWyvkWlvcO69M~xP4WGUJjA__"
                      className="rounded-circle"
                      alt="Profile Picture"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <h5 className="card-title">John Doe</h5>
                      <p className="card-text">5 hrs ago</p>
                    </div>
                    <div className="ms-auto">
                      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </div>
                  </div>

                  <p className="card-text mt-3 pera">
                    Hi Everyone, do you know this location or store? Is this a
                    good location? Is this a good business item? What is the
                    current retail business situation in Plainview, NY?
                  </p>
                  {/* Add slider here */}
                  <div
                    id="carouselExampleIndicators2"
                    className="carousel slide w-75 pera"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators2"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators2"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators2"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          src="https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src="https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src="https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleIndicators2"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleIndicators2"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-start mt-4 pera ">
                  <button className="btn ms-0 me-4">Office</button>
                  <button className="btn ms-2 ">Plainview NY</button>
                  <p className="mx-4">
                    <i className="fa fa-comment mt-3 mx-3" aria-hidden="true">
                      {" "}
                      <strong> Comment</strong>
                    </i>
                  </p>
                </div>
              </div>

              <div className="card-community mt-4 shadow-sm">
                <div className="card-body">
                  <div className="d-flex">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/cbc8/55c4/ae85c9ad569ebf472e5875557074b685?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QUzd0ywC9yhXiLZ0ztJjd3VVivc9xuCeKnjb6ph6DGV0kbJ6~FlC080ODpZTVcYHAsSt-qRQzCcR7tvvV4b9aCl1QfcnHOw8eQc6aYGTeABEgL18qSWLWe8IBpky1T1i9PTUAlLh121-NfOHPWkTvvBUa-mZ4d4xQDFnLGCQFCmcEgzUo51EUhm6rpcSXzUzDjkbOcVIX5Zkmx60GattMAqlV7DY7KmDmyPJk-Yv0np67CAQHlrITr2epYB9G3S0CHJSdWK5SN-rdf0lam-F0kDk1Dzt4ctGOUTBxLv3H78iAv4cyAXQHMyq-5Rxfa7WWyvkWlvcO69M~xP4WGUJjA__"
                      className="rounded-circle"
                      alt="Profile Picture"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <h5 className="card-title">John Doe</h5>
                      <p className="card-text">5 hrs ago</p>
                    </div>
                    <div className="ms-auto">
                      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </div>
                  </div>

                  <p className="card-text mt-3 pera">
                    Hi Everyone, do you know this location or store? Is this a
                    good location? Is this a good business item? What is the
                    current retail business situation in Plainview, NY?
                  </p>
                  {/* Add slider here */}
                  <div
                    id="carouselExampleIndicators2"
                    className="carousel slide w-75 pera"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators2"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators2"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators2"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          src="https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src="https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src="https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleIndicators2"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleIndicators2"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-start mt-4 pera ">
                  <button className="btn ms-0 me-4 ">Office</button>
                  <button className="btn ms-2 ">Plainview NY</button>
                  <p className="mx-4">
                    <i className="fa fa-comment mt-3 mx-3" aria-hidden="true">
                      {" "}
                      <strong> Comment</strong>
                    </i>
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-3 d-flex flex-column py-5 mt-4"
              style={{ backgroundColor: "#fff", height: "100vh" }}
            >
              <form className="mt-3">
                <div className="form-group d-flex align-items-start">
                <div class="d-flex align-items-center">
  <div class="input-group">
    <input
      type="text"
      class="form-control flex-grow-1"
      placeholder="Search a message"
    />
    <span class="input-group-text">
      <i class="fa fa-search"></i>
    </span>
  </div>
  <button type="submit" className="border-0 bg-transparent ml-2">
    <span style={{ fontSize: "1em ", textAlign: "center" }}>Ask Question</span>
  </button>
</div>

                </div>
              </form>
              <div class="text-center mt-2">
                <h4 class="mt-3 follow">Follow us</h4>
              </div>

              <div class="d-flex flex-column">
                <div class="d-flex align-items-center mt-3 border-bottom p-2">
                  <span class="material-icons px-2">
                    {/* <i class="fa fa-instagram" aria-hidden="true"></i> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="63"
                      viewBox="0 0 64 63"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_29_77)">
                        <path
                          d="M44 0H20C14.6957 0 9.60859 2.07421 5.85786 5.76634C2.10714 9.45846 0 14.4661 0 19.6875L0 43.3125C0 48.534 2.10714 53.5415 5.85786 57.2337C9.60859 60.9258 14.6957 63 20 63H44C49.3043 63 54.3914 60.9258 58.1421 57.2337C61.8929 53.5415 64 48.534 64 43.3125V19.6875C64 14.4661 61.8929 9.45846 58.1421 5.76634C54.3914 2.07421 49.3043 0 44 0ZM58 43.3125C58 50.9119 51.72 57.0938 44 57.0938H20C12.28 57.0938 6 50.9119 6 43.3125V19.6875C6 12.0881 12.28 5.90625 20 5.90625H44C51.72 5.90625 58 12.0881 58 19.6875V43.3125Z"
                          fill="url(#paint0_linear_29_77)"
                        />
                        <path
                          d="M32 15.75C27.7565 15.75 23.6869 17.4094 20.6863 20.3631C17.6857 23.3168 16 27.3228 16 31.5C16 35.6772 17.6857 39.6832 20.6863 42.6369C23.6869 45.5906 27.7565 47.25 32 47.25C36.2435 47.25 40.3131 45.5906 43.3137 42.6369C46.3143 39.6832 48 35.6772 48 31.5C48 27.3228 46.3143 23.3168 43.3137 20.3631C40.3131 17.4094 36.2435 15.75 32 15.75ZM32 41.3438C29.3488 41.3406 26.8071 40.3025 24.9324 38.4571C23.0578 36.6117 22.0032 34.1098 22 31.5C22 26.0702 26.488 21.6562 32 21.6562C37.512 21.6562 42 26.0702 42 31.5C42 36.9259 37.512 41.3438 32 41.3438Z"
                          fill="url(#paint1_linear_29_77)"
                        />
                        <path
                          d="M49.2 16.6675C50.3775 16.6675 51.332 15.7279 51.332 14.5688C51.332 13.4097 50.3775 12.4701 49.2 12.4701C48.0225 12.4701 47.068 13.4097 47.068 14.5688C47.068 15.7279 48.0225 16.6675 49.2 16.6675Z"
                          fill="url(#paint2_linear_29_77)"
                        />
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_29_77"
                          x1="5.856"
                          y1="57.2355"
                          x2="57.3206"
                          y2="4.95398"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FFC107" />
                          <stop offset="0.507" stop-color="#F44336" />
                          <stop offset="0.99" stop-color="#9C27B0" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_29_77"
                          x1="20.688"
                          y1="42.6352"
                          x2="42.9557"
                          y2="20.0141"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FFC107" />
                          <stop offset="0.507" stop-color="#F44336" />
                          <stop offset="0.99" stop-color="#9C27B0" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_29_77"
                          x1="47.692"
                          y1="16.0532"
                          x2="50.6605"
                          y2="13.0376"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FFC107" />
                          <stop offset="0.507" stop-color="#F44336" />
                          <stop offset="0.99" stop-color="#9C27B0" />
                        </linearGradient>
                        <clipPath id="clip0_29_77">
                          <rect width="64" height="63" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span class="ml-2">
                    Follow us on <strong>Instagram</strong>
                  </span>
                </div>
                <div class="d-flex align-items-center mt-3 border-bottom p-2">
                  <span class="material-icons px-2">
                    {/* <i class="fa fa-facebook" aria-hidden="true"></i> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="62"
                      height="62"
                      viewBox="0 0 62 62"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_4_1605)">
                        <path
                          d="M54.25 0H7.75C3.47587 0 0 3.47587 0 7.75V54.25C0 58.5241 3.47587 62 7.75 62H54.25C58.5241 62 62 58.5241 62 54.25V7.75C62 3.47587 58.5241 0 54.25 0Z"
                          fill="#1976D2"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M52.3125 31H42.625V23.25C42.625 21.111 44.361 21.3125 46.5 21.3125H50.375V11.625H42.625C39.5419 11.625 36.585 12.8498 34.4049 15.0299C32.2248 17.21 31 20.1669 31 23.25V31H23.25V40.6875H31V62H42.625V40.6875H48.4375L52.3125 31Z"
                          fill="#FAFAFA"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4_1605">
                          <rect width="62" height="62" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span class="ml-2">
                    Follow us on <strong>Facebook</strong>
                  </span>
                </div>
                <div class="d-flex align-items-center mt-3 border-bottom p-2">
                  <span class="material-icons px-2">
                    {/* <i class="fa fa-twitter-square" aria-hidden="true"></i> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="57"
                      viewBox="0 0 60 57"
                      fill="none"
                    >
                      <path
                        d="M52.9688 0H7.03125C3.148 0 0 2.9906 0 6.67969V50.3203C0 54.0094 3.148 57 7.03125 57H52.9688C56.852 57 60 54.0094 60 50.3203V6.67969C60 2.9906 56.852 0 52.9688 0Z"
                        fill="black"
                      />
                      <path
                        d="M41.7068 11.1328H47.9093L34.3587 25.8459L50.2999 45.8672H37.818L28.0418 33.7244L16.8555 45.8672H10.6493L25.143 30.1298L9.85059 11.1328H22.6493L31.4862 22.2318L41.7068 11.1328ZM39.5299 42.3403H42.9668L20.7818 14.4744H17.0937L39.5299 42.3403Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span class="ml-2">
                    Follow us on <strong>X</strong>
                  </span>
                </div>
                <div class="d-flex align-items-center mt-3 border-bottom p-2">
                  <span class="material-icons px-2">
                    {/* <i class="fa fa-google-plus"></i> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="63"
                      height="63"
                      viewBox="0 0 63 63"
                      fill="none"
                    >
                      <path
                        d="M63 27.5625H55.125V19.6875H51.1875V27.5625H43.3125V31.5H51.1875V39.375H55.125V31.5H63V27.5625ZM19.6875 35.4375H30.8267C30.0093 37.739 28.5 39.7313 26.5057 41.1412C24.5114 42.5511 22.1298 43.3095 19.6875 43.3125C13.1749 43.3125 7.875 38.0126 7.875 31.5C7.875 24.9874 13.1749 19.6875 19.6875 19.6875C22.5107 19.6875 25.2276 20.6994 27.3381 22.5383L32.5119 16.6005C28.9557 13.508 24.4003 11.8072 19.6875 11.8125C8.83181 11.8125 0 20.6443 0 31.5C0 42.3557 8.83181 51.1875 19.6875 51.1875C30.5432 51.1875 39.375 42.3557 39.375 31.5V27.5625H19.6875V35.4375Z"
                        fill="#F44336"
                      />
                    </svg>
                  </span>
                  <span class="ml-2">
                    Follow us on <strong>Google Plus</strong>
                  </span>
                </div>
                <div class="d-flex align-items-center mt-3 border-bottom p-2">
                  <span class="material-icons px-2">
                    {/* <i class="fa fa-youtube-square"></i> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="71"
                      height="56"
                      viewBox="0 0 71 56"
                      fill="none"
                    >
                      <path
                        d="M29.405 55.9306C15.8833 55.651 11.265 55.3995 8.42635 54.7427C6.50579 54.3063 4.83682 53.3373 3.61309 51.932C2.6673 50.8683 1.91515 49.2455 1.3316 46.994C0.831044 45.1182 0.63609 43.5575 0.358148 39.7452C-0.0673257 31.1414 -0.168754 24.1072 0.358148 16.2475C0.792843 11.9071 1.0036 6.75463 3.89103 3.74863C5.25439 2.34178 6.84037 1.43643 8.6213 1.06216C11.4033 0.468949 23.256 0 35.5263 0C47.7689 0 59.6479 0.468949 62.4326 1.06216C64.6574 1.53111 66.7439 2.93647 67.969 4.74866C70.6035 9.40264 70.6496 15.1898 70.917 19.7165C71.0277 21.8734 71.0277 34.1208 70.917 36.2777C70.5008 43.4317 70.1662 45.9629 69.2204 48.5872C68.6355 50.244 68.1363 51.1183 67.2722 52.0873C65.9169 53.5784 64.1892 54.5702 62.3193 54.9306C50.6181 55.9188 40.682 56.1333 29.405 55.9306ZM47.3236 27.1842C40.8137 23.2773 34.5805 19.6544 28.2089 15.9043V38.3399C34.9137 34.2465 41.9821 30.4964 47.3513 27.1531L47.3236 27.1842Z"
                        fill="#CD201F"
                      />
                    </svg>
                  </span>
                  <span class="ml-2">
                    Follow us on <strong>Youtube</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityBoard;
