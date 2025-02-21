import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Rating(question) {
  console.log("heio", question.field.staring.labels);
  const label = question.field.staring.labels;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
      }}
    >
      {label.map((label, index) => (
        <div key={index}>
          <FontAwesomeIcon
            icon={faStar}
            size="2x"
            style={{ cursor: "pointer" }}
          />

          <p>{label.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Rating;
