const NumericalValue = ({
  field,
  formData,
  handleChange,
  selectedLanguage,
}) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

  return (
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
  );
};

export default NumericalValue;
