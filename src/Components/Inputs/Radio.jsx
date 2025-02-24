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
        const isSingleCharacter =
          option.translations?.[selectedLanguage]?.length === 1 ||
          option.label.length === 1;
        const isEmoji = option.emoji;

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
                margin: "2px",
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
              <label
                style={{
                  color:
                    formData[field.fieldId] === option.value
                      ? "white"
                      : "black",
                  backgroundColor:
                    formData[field.fieldId] === option.value
                      ? "rgb(0, 0, 0)"
                      : "rgb(218, 218, 218)",
                  borderRadius: isEmoji
                    ? "50%"
                    : isSingleCharacter
                    ? "50%"
                    : "50px",
                  padding: "4px",
                }}
                htmlFor={`${field.fieldId}-${option.value}`}
              >
                {option.emoji ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2em",
                      height: "2em",
                      borderRadius: "50%",
                      backgroundColor:
                        formData[field.fieldId] === option.value
                          ? "rgb(0, 0, 0)"
                          : "rgb(218, 218, 218)",
                      padding: "4px",
                    }}
                  >
                    <IconComponent
                      iconName={option.emoji}
                      color={option.color}
                      size="1em"
                    />
                  </div>
                ) : (
                  option.translations?.[selectedLanguage] || option.label
                )}

                <span className="tooltip">
                  {option.tooltip ||
                    option.translations?.[selectedLanguage] ||
                    option.label}
                </span>
              </label>
            </div>{" "}
          </div>
        );
      })}
    </div>
  );
};

export default Radio;
