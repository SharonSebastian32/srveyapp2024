import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "@mui/material/Pagination";

function ListContainer({ initialFields, handleFormNavigation }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(initialFields.length / itemsPerPage);

  const handleButtonClick = (formId) => {
    setSelectedFormId(formId);
    setShowPopup(true);
  };

  const handlePopupResponse = (response) => {
    if (response === "yes") {
      handleFormNavigation(selectedFormId);
    }
    setShowPopup(false);
    setSelectedFormId(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  AOS.init();

  return (
    <>
      <div className="list-container">
        {initialFields.length > 0 ? (
          <>
            {initialFields
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((obj, index) => (
                <div
                  className="list"
                  key={index}
                  data-aos="fade-up"
                  data-aos-duration="400"
                >
                  <p id="list-title">{obj.english_title}</p>
                  {obj.survey_time_limit && (
                    <div>
                      <span id="duration">Duration</span>
                      <span
                        style={{
                          backgroundColor: "#f3dedc",
                          color: "#de0000",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          fontSize: "18px",
                        }}
                      >
                        {obj.survey_time_limit}
                      </span>
                    </div>
                  )}
                  <button
                    className="submit-btn"
                    style={{ backgroundColor: obj.color }}
                    onClick={() => handleButtonClick(obj.formId)}
                  >
                    Start
                  </button>
                </div>
              ))}
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 1000,
            }}
          >
            <div className="loader"></div>
          </div>
        )}

        {showPopup && (
          <div className="popup">
            <div
              className="popup-content"
              data-aos="zoom-in"
              data-aos-duration="500"
            >
              <p id="question-p">Are you sure you want to start the survey?</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "50px",
                  justifyContent: "space-between",
                }}
              >
                <button
                  id="pop-up-no"
                  className="popup-btn"
                  onClick={() => handlePopupResponse("no")}
                >
                  No
                </button>
                <button
                  id="pop-up-yes"
                  className="popup-btn"
                  onClick={() => handlePopupResponse("yes")}
                >
                  Yes
                </button>
              </div>
              <div
                style={{
                  gap: "10px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "30px",
                }}
              >
                <IoWarningOutline
                  style={{
                    color: "#bf8d02",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  id="warn-symbol"
                />
                <span
                  id="warning"
                  style={{
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "300",
                  }}
                >
                  Once Started, Complete all the Questions.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ListContainer;
