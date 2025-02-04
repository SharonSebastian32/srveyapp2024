const CheckBox = ({ field, formData, handleChange, selectedLanguage }) => {
  return (
    <div className="checkbox-group">
      {field.options.map((option) => (
        <div
          key={option.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexWrap: "wrap",
            borderRadius: "50px",
            margin: "10px",
            border: "1px solid #ccc",
            padding: "5px 12px",
          }}
        >
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
            onChange={(e) => {
              const currentValues = formData[field.fieldId] || [];
              const newValues = e.target.checked
                ? [...currentValues, option.id]
                : currentValues.filter((v) => v !== option.id);
              handleChange(field.fieldId, newValues);
            }}
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
