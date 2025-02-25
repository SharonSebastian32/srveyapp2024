import "../../../styles/Home.css";
import sideImage from "../../../assets/sideImage.png";
import logo from "../../../assets/Logo.png";
import { useEffect } from "react";
import AOS from "aos";

function Banner() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <div className="banner">
        <div className="banner_group">
          <div className="banner-left">
            <div>
              <img className="logo" src={logo} alt="Side" data-aos="zoom-in" />
            </div>
            <div>
              <h2 style={{ fontSize: "3em" }}>Welcome to the survey selection page.</h2>
              <p data-aos="fade-right">
                Select the Way that you wish to attend.
              </p>
            </div>
          </div>
          <div className="banner-right">
            <img
              className="sideImage"
              src={sideImage}
              alt="Side"
              data-aos="fade-left"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;

