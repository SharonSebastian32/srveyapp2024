import "../../../styles/Home.css";
import sideImage from "../../../assets/sideImage.png";
import logo from "../../../assets/Logo.png";
function Banner() {
  return (
    <>
      <div className="banner">
        <div className="banner_group">
          <div className="banner-left">
            <div data-aos="zoom-out">
              <img className="logo" src={logo} alt="Side" />
            </div>
            <h2 data-aos="fade-right">
              Welcome to the survey of selection page
            </h2>
            <p data-aos="fade-right">Select the Way that you wish to attend </p>
          </div>
          <div className="banner-right">
            <img
              data-aos="fade-left"
              className="sideImage"
              src={sideImage}
              alt="Side"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
