import "../../styles/tooltip.css";
import IconComponent from "../../utils/Icons";

const Radio = ({ field, formData, handleChange, selectedLanguage }) => {
  console.log("field", field);

  return (
    <div
      className="radio-group2"
      style={{
        display: "flex",
        flexFlow: field.is_horizontal === true ? "row" : "column",
        gap: "3px",
        flexWrap: "wrap",
      }}
    >
      {field.options.map((option) => {
        return (
          <div key={option.value} className="radio-item2">
            <div
              className="label-container"
              onClick={() => handleChange(field.fieldId, option.value)}
              style={{
                border: option.image ? "1px solid black" : "none",
                borderRadius: "5px",
                padding: "8px",
                cursor: "pointer",
                margin: "10px",
              }}
            >
              {option.image && (
                <img
                  src={option.image}
                  alt=""
                  style={{
                    width: "200px",
                    height: "220px",
                    objectFit: "cover",
                    padding: "10px",
                  }}
                />
              )}
              <input
                type="radio"
                id={`${field.fieldId}-${option.value}`}
                name={field.fieldId}
                value={option.value}
                checked={formData[field.fieldId] === option.value}
                style={{ display: "none" }}
              />
              {!option.image && (
                <label>
                  <span className="tooltip">
                    {option.tooltip ||
                      option.translations?.[selectedLanguage] ||
                      option.label}
                  </span>
                </label>
              )}
              {option.image ? null : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2em",
                    height: "2em",
                    borderRadius: "6%",
                    backgroundColor:
                      formData[field.fieldId] === option.value
                        ? "rgb(0, 0, 0)"
                        : "rgb(203, 255, 190)",

                    color:
                      formData[field.fieldId] === option.value
                        ? "white"
                        : "black",
                  }}
                >
                  {option.translations?.[selectedLanguage] || option.label}
                </div>
              )}
            </div>{" "}
          </div>
        );
      })}
    </div>
  );
};

export default Radio;
