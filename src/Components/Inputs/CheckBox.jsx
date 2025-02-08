 
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
        <div key={option.value} id="checkbox-input-div">
          <input
            style={{
              verticalAlign: "middle",
              position: "relative",
              bottom: "1px",
            }}
            type="checkbox"
            id={`${field.fieldId}-${option.value}`}
            name={field.fieldId}
            value={option.value}
            checked={formData[field.fieldId]?.includes(option.value)}
            onChange={() => onCheckboxChange(option.value)}
            required={field.required}
          />
          <label
            htmlFor={`${field.fieldId}-${option.value}`}
            style={{ paddingTop: ".58em" }}
          >
            {option.translations?.[selectedLanguage] || option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
