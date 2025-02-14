import NoData from "../assets/NoImage.png";

import "../styles/NotFound.css";
const PageNotFound = () => {
  return (
    <div id="page-not-found">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "50px",
        }}
      >
        <img src={NoData} alt="image" id="no_data" data-aos="fade-up" />
        <h2 data-aos="zoom-in">You Dont Have Any Surveys At The Moment</h2>
      </div>
    </div>
  );
};

export default PageNotFound;
