import logo from "../../../assets/Logo.png";
import "./Header.css";
const Header = () => {
  return (
    <>
      <div className="sm-banner">
        <img
          className="logo-img"
          src={logo}
          alt=""
          data-aos="fade-right"
          data-aos-duration="1000"
        />
      </div>
    </>
  );
};

export default Header;
