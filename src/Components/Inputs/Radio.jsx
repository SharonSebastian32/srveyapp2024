const Radio = ({ field, formData, handleChange, selectedLanguage }) => {
  // const jsonResponse = field.translations?.[selectedLanguage] || field.label;

  return (
    <div key={field.index}>
      <div
      // dangerouslySetInnerHTML={{
      //   __html: jsonResponse,
      // }}
      />
      <div className="radio-group2">
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
                style={{
                  display: "none",
                }}
              />
              <label
                style={{
                  color:
                    formData[field.fieldId] === option.value
                      ? "white"
                      : "black",
                  cursor: "pointer",
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
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Radio;
