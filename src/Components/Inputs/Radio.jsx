const Radio = ({ field, formData, handleChange, selectedLanguage }) => {
  return (
    <div className="radio-group2">
      {field.options.map((option) => (
        <div key={option.id} className="radio-item2">
          <label
            style={{
              padding: "10px 25px",
              fontWeight: "500",
              fontSize: "18px",
              color: formData[field.fieldId] === option.id ? "white" : "black",
              cursor: "pointer",
              backgroundColor:
                formData[field.fieldId] === option.id
                  ? "rgb(8, 8, 8)"
                  : "rgb(222, 251, 205)",
              border:
                option.translations?.[selectedLanguage]?.length === 1 ||
                option.label.length === 1
                  ? "1px solid black"
                  : "none",
              borderRadius:
                option.translations?.[selectedLanguage]?.length === 1 ||
                option.label.length === 1
                  ? "50%"
                  : "50px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width:
                option.translations?.[selectedLanguage]?.length === 1 ||
                option.label.length === 1
                  ? "50px"
                  : "auto",
              height:
                option.translations?.[selectedLanguage]?.length === 1 ||
                option.label.length === 1
                  ? "50px"
                  : "auto",
            }}
            htmlFor={`${field.fieldId}-${option.id}`}
            id="radio-label"
            onClick={() => handleChange(field.fieldId, option.id)}
          >
            {option.translations?.[selectedLanguage] || option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
