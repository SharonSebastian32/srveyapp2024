const DateTime = ({ field, formData, handleChange, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;
  return (
    <input
      type="datetime-local"
      id={field.fieldId}
      name={field.fieldId}
      value={formData[field.fieldId] || ""}
      onChange={(e) => handleChange(field.fieldId, e.target.value)}
      placeholder={placeholder}
      required={field.required}
    />
  );
};

export default DateTime;
