const DateTime = ({ field, formData, handleChange, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;
  return (
    <input
      type="datetime-local"
      id={field.fieldId}
      placeholder="Please enter value....."
      name={field.fieldId}
      value={formData[field.fieldId] || ""}
      onChange={(e) => handleChange(field.fieldId, e.target.value)}
       required={field.required}
    />
  );
};

export default DateTime;
