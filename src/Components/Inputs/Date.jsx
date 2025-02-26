import "../../styles/tooltip.css";

const Date = ({ field, formData, handleChange, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

  const showError = !formData[field.fieldId];

  return (
    <div className="date-wrapper">
      <label className="date-label" htmlFor={field.fieldId}>
        <input
          type="date"
          id={field.fieldId}
          name={field.fieldId}
          value={formData[field.fieldId] || ""}
          onChange={(e) => handleChange(field.fieldId, e.target.value)}
          placeholder={field.placeholder}
          required={field.is_mandatory}
        />
      </label>
      {showError && <p style={{ color: "red" }}>Please select any date</p>}
    </div>
  );
};

export default Date;
