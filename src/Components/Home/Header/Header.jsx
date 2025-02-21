import logo from "../../../assets/Logo.png";
import "../../../styles/Header.css";
const Header = () => {
  return (
    <>
      <div
        className="sm-banner"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          zIndex: "1",
        }}
      >
        <img className="logo-img" src={logo} alt="_LOGO" />
      </div>
    </>
  );
};

export default Header;
