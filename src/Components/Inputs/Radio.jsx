import "../../styles/tooltip.css";
import IconComponent from "../../utils/Icons";
import AOS from "aos";

const Radio = ({ field, formData, handleChange, selectedLanguage }) => {
  console.log("field", field);
  AOS.init();
  return (
    <div
      className="radio-group2"
      style={{
        display: "flex",
        flexDirection: field.is_horizontal === true ? "row" : "column",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {field.options.map((option) => {
        const isSingleCharacter =
          option.translations?.[selectedLanguage]?.length === 1 ||
          option.label.length === 1;
        const isEmoji = option.emoji && !option.image;
        const hasImage = !!option.image;
        const isSelected = formData[field.fieldId] === option.value; // Check if this option is selected

        return (
          <div key={option.value} className="radio-item2">
            <div
              className="label-container"
              onClick={() => handleChange(field.fieldId, option.value)}
              style={{
                border: hasImage
                  ? isSelected
                    ? "3px solid black" // Thicker border for selected image
                    : "1px solid black"
                  : "none",
                borderRadius: "5px",
                cursor: "pointer",
                margin: "2px",
              }}
            >
              {hasImage ? (
                <>
                  <input
                    type="radio"
                    id={`${field.fieldId}-${option.value}`}
                    name={field.fieldId}
                    value={option.value}
                    checked={isSelected}
                    style={{ display: "none" }}
                  />
                  <img
                    data-aos="zoom-in"
                    src={option.image}
                    alt=""
                    style={{
                      width: "200px",
                      height: "220px",
                      objectFit: "cover",
                      margin: "20px",
                    }}
                  />
                </>
              ) : (
                <>
                  <input
                    type="radio"
                    id={`${field.fieldId}-${option.value}`}
                    name={field.fieldId}
                    value={option.value}
                    checked={isSelected}
                    style={{ display: "none" }}
                  />
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isEmoji ? "2em" : "auto",
                      height: isEmoji ? "2em" : "auto",
                      borderRadius: isEmoji ? "50%" : "50px",
                      padding: "4px 10px",
                      backgroundColor: isSelected
                        ? "rgb(12, 12, 12)"
                        : "rgb(218, 218, 218)",
                      color: isSelected ? "white" : "black",
                    }}
                    htmlFor={`${field.fieldId}-${option.value}`}
                  >
                    {isEmoji ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          backgroundColor: isSelected
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
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Radio;
