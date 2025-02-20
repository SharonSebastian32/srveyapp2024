import "../../styles/tooltip.css";

const Radio = ({ field, formData, handleChange, selectedLanguage }) => {
  return (
    <div
      className="radio-group2"
      style={{
        display: "flex",
        flexDirection: field.is_horizontal ? "row" : "column", // Use is_horizontal to determine direction
        gap: "10px",
      }}
    >
      {field.options.map((option) => {
        const isSingleCharacter =
          option.translations?.[selectedLanguage]?.length === 1 ||
          option.label.length === 1;

        return (
          <div key={option.value} className="radio-item2">
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
                  formData[field.fieldId] === option.value ? "white" : "black",
                backgroundColor:
                  formData[field.fieldId] === option.value
                    ? "rgb(8, 8, 8)"
                    : "rgb(222, 251, 205)",
                borderRadius: isSingleCharacter ? "50%" : "50px",
                padding: isSingleCharacter ? "10px 18px" : "10px 18px",
              }}
              htmlFor={`${field.fieldId}-${option.value}`}
            >
              {option.translations?.[selectedLanguage] || option.label}
              <span className="tooltip">
                {option.translations?.[selectedLanguage] || option.label}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Radio;
