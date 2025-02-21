import logo from "../../../assets/Logo.png";
import "../../../styles/Header.css";
const Header = () => {
  return (
    <>
      <div className="sm-banner">
        <img className="logo-img" src={logo} alt="_LOGO" />
      </div>
    </>
  );
};

export default Header;
