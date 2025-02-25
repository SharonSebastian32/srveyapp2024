const DateTime = ({ field, formData, handleChange, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

  const showError = !formData[field.fieldId] || formData[field.fieldId] === "";

  return (
    <>
      <input
        type="datetime-local"
        id={field.fieldId}
        placeholder={placeholder}
        name={field.fieldId}
        value={formData[field.fieldId] || ""}
        onChange={(e) => handleChange(field.fieldId, e.target.value)}
        required
      />
      {showError && <p style={{ color: "red" }}>Please select the date and time</p>}
    </>
  );
};

export default DateTime;

