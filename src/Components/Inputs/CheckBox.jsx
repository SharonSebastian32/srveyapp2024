import "../../../src/styles/checkbox.css";

const CheckBox = ({ field, formData, handleChange, selectedLanguage }) => {
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
