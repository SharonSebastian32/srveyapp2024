import "../../styles/RadioFeedBack.css";

const Radio = ({ field, formData, handleChange, selectedLanguage }) => {
  return (
    <div className="radio-group2">
      {field.options.map((option) => {
        const isSingleCharacter =
          option.translations?.[selectedLanguage]?.length === 1 ||
          option.label.length === 1;

        return (
          <div key={option.id} className="radio-item2">
            <label
              id="radio-button"
              style={{
                color:
                  formData[field.fieldId] === option.id ? "white" : "black",
                cursor: "pointer",
                backgroundColor:
                  formData[field.fieldId] === option.id
                    ? "rgb(8, 8, 8)"
                    : "rgb(222, 251, 205)",
                border: isSingleCharacter ? "1px solid black" : "none",
                borderRadius: isSingleCharacter ? "50%" : "50px",
                padding: isSingleCharacter ? "10px 18px" : "10px 18px",

                width: isSingleCharacter ? "50px" : "auto",
                height: isSingleCharacter ? "50px" : "auto",
              }}
              htmlFor={`${field.fieldId}-${option.id}`}
              onClick={() => handleChange(field.fieldId, option.id)}
            >
              {option.translations?.[selectedLanguage] || option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Radio;
