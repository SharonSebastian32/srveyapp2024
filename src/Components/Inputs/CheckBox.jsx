import "../../../src/styles/checkbox.css";

const CheckBox = ({ field, formData, setFormData, selectedLanguage }) => {
  const handleChange = (optionId) => {
    setFormData((prev) => {
      const currentSelections = prev[field.fieldId] || [];
      const newSelections = currentSelections.includes(optionId)
        ? currentSelections.filter((id) => id !== optionId) 
        : [...currentSelections, optionId];  

      return {
        ...prev,
        [field.fieldId]: newSelections,
      };
    });
  };

  return (
    <div className="checkbox-group">
      {field.options.map((option) => (
        <div key={option.id} id="checkbox-input-div">
          <input
            style={{
              verticalAlign: "middle",
              position: "relative",
              bottom: "1px",
            }}
            type="checkbox"
            id={`${field.fieldId}-${option.id}`}
            name={field.fieldId}
            value={option.id}
            checked={formData[field.fieldId]?.includes(option.id)}
            onChange={() => handleChange(option.id)}
            required={field.required}
          />
          <label
            htmlFor={`${field.fieldId}-${option.id}`}
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
