import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Rating() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
      }}
    >
      <FontAwesomeIcon
        icon={faStar}
        size="2x"
        style={{ color: "#998005", cursor: "pointer" }}
      />
      <FontAwesomeIcon icon={faStar} size="2x" style={{ cursor: "pointer" }} />
      <FontAwesomeIcon icon={faStar} size="2x" style={{ cursor: "pointer" }} />
      <FontAwesomeIcon icon={faStar} size="2x" style={{ cursor: "pointer" }} />
    </div>
  );
}

export default Rating;

