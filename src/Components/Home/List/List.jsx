import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

function ListContainer({ initialFields, handleFormNavigation }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null);

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

  return (
    <div className="list-container">
      {initialFields.length > 0 ? (
        initialFields.map((obj, index) => (
          <div className="list" key={index} data-aos="fade-up">
            <p id="list-title">{obj.english_title}</p>
            <button
              className="submit-btn"
              style={{ backgroundColor: obj.color }}
              onClick={() => handleButtonClick(obj.formId)}
            >
              Start
            </button>
          </div>
        ))
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
                gap: "150px",
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
                paddingTop: "50px",
              }}
            >
              <IoWarningOutline
                style={{
                  color: "#d9d131",
                  fontSize: "35px",
                }}
                id="warn-symbol"
              />
              <span
                id="warning"
                style={{
                  fontSize: "18px",
                  color: "black",
                }}
              >
                Once Started, Complete all the Questions.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListContainer;
