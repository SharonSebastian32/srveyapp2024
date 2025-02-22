import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaugh } from "@fortawesome/free-solid-svg-icons";
function Rating({ field }) {
  const labels = field.staring.labels;
  const [selectedRating, setSelectedRating] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
      {labels.map((label, index) => (
        <div key={index} style={{ position: "relative" }}>
          <FontAwesomeIcon
            icon={faLaugh}
            size="2x"
            style={{
              cursor: "pointer",
              color: selectedRating >= index ? "orange" : "black",
            }}
            onClick={() => setSelectedRating(index)}
            onMouseEnter={(e) => {
              const tooltip = e.currentTarget.nextSibling;
              tooltip.style.visibility = "visible";
              tooltip.style.opacity = 1;
            }}
            onMouseLeave={(e) => {
              const tooltip = e.currentTarget.nextSibling;
              tooltip.style.visibility = "hidden";
              tooltip.style.opacity = 0;
            }}
          />
          <div
            style={{
              visibility: "hidden",
              opacity: 0,
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              color: "#fff",
              textAlign: "center",
              borderRadius: "4px",
              padding: "5px 10px",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              transition: "opacity 0.3s",
              whiteSpace: "nowrap",
              zIndex: 1,
            }}
            className="tooltip"
          >
            {label.title}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Rating;
