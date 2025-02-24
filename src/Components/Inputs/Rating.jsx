import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaugh,
  faStar,
  faThumbsUp,
  faGrin,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

function Rating({ field, value, onChange }) {
  const labels = field.staring?.labels || [];
  const shape = field.staring?.shape || "fas fa-star";
  const [selectedRating, setSelectedRating] = useState(null);

  const iconMap = {
    "fas fa-thumbs-up": faThumbsUp,
    "fas fa-heart": faHeart,
    "fas fa-star": faStar,
    "fas fa-grin": faGrin,
    "fas fa-laugh": faLaugh,
  };

  useEffect(() => {
    if (value?.staring?.custom_rating) {
      setSelectedRating(parseInt(value.staring.custom_rating) - 1);
    }
  }, [value]);

  const handleRatingClick = (index) => {
    setSelectedRating(index);
    if (onChange) {
      onChange({
        answer_type: "Ranking",
        question_id: field.id,
        custom_answer: labels[index]?.title || "",
        staring: {
          id: field.staring?.id || 17,
          staring_id: field.staring?.id || 17,
          custom_rating: (index + 1).toString(),
        },
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
      {labels.map((label, index) => (
        <div key={index} style={{ position: "relative" }}>
          <FontAwesomeIcon
            icon={iconMap[shape] || faStar}
            style={{
              cursor: "pointer",
              fontSize: "1.4em",
              color:
                selectedRating >= index
                  ? field.staring?.color || "orange"
                  : "black",
            }}
            onClick={() => handleRatingClick(index)}
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
