const CheckBox = ({ field, formData, handleChange, selectedLanguage }) => {
  const onCheckboxChange = (optionValue) => {
    const currentSelections = formData[field.fieldId] || [];
    const newSelections = currentSelections.includes(optionValue)
      ? currentSelections.filter((value) => value !== optionValue)
      : [...currentSelections, optionValue];

    handleChange(field.fieldId, newSelections);
  };

  return (
    <div className="checkbox-group">
      {field.options.map((option) => (
        <div
          key={option.value}
          id="checkbox-input-div"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexWrap: "wrap",
            borderRadius: "10px",
            margin: "10px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <label
            htmlFor={`${field.fieldId}-${option.value}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "0.58em",
            }}
          >
            <img
              src={option.image}
              alt=""
              style={{
                width: "150px",
                height: "160px",
                objectFit: "cover",
              }}
            />
            <span>
              {option.translations?.[selectedLanguage] || option.label}
            </span>
          </label>
          <input
            type="checkbox"
            id={`${field.fieldId}-${option.value}`}
            name={field.fieldId}
            value={option.value}
            checked={formData[field.fieldId]?.includes(option.value)}
            onChange={() => onCheckboxChange(option.value)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
