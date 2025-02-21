import "../../styles/tooltip.css";

const Radio = ({ field, formData, handleChange, selectedLanguage }) => {
  console.log("field", field);

  return (
    <div
      className="radio-group2"
      style={{
        display: "flex",
        flexDirection: field.is_horizontal === true ? "row" : "column",
        gap: "10px",
      }}
    >
      {field.options.map((option) => {
        const isSingleCharacter =
          option.translations?.[selectedLanguage]?.length === 1 ||
          option.label.length === 1;

        return (
          <div key={option.value} className="radio-item2">
            <div
              className="label-container"
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                padding: "10px",
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
                onChange={() => handleChange(field.fieldId, option.value)}
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
                      ? "rgb(8, 8, 8)"
                      : "rgb(222, 251, 205)",
                  borderRadius: isSingleCharacter ? "50%" : "50px",
                  padding: "10px 18px",
                }}
                htmlFor={`${field.fieldId}-${option.value}`}
              >
                {option.translations?.[selectedLanguage] || option.label}
                <span className="tooltip">
                  {option.tooltip ||
                    option.translations?.[selectedLanguage] ||
                    option.label}
                </span>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Radio;
