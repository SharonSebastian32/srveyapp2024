import logo from "../../../assets/Logo.png";
import "./Header.css";
const Header = () => {
  return (
    <>
      <div className="sm-banner">
        <img className="logo-img" src={logo} alt="" />
      </div>
    </>
  );
};

export default Header;
