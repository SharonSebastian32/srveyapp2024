const NumericalValue = ({
  field,
  formData,
  handleChange,
  selectedLanguage,
}) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

  const showError = !formData[field.fieldId] || formData[field.fieldId] === "";

  return (
    <>
      <input
        type="number"
        min="1"
        id={field.fieldId}
        name={field.fieldId}
        value={formData[field.fieldId] || ""}
        onChange={(e) => handleChange(field.fieldId, e.target.value)}
        placeholder="Please Enter your ctc as numbers....."
        required={field.required}
      />
      {showError && (
        <p style={{ color: "red" }}>Please enter a valid numerical value</p>
      )}
    </>
  );
};

export default NumericalValue;

