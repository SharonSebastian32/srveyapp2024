const TextboxField = ({ field, formData, handleChange, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

  return (
    <input
      type="text"
      id={field.fieldId}
      name={field.fieldId}
      value={formData[field.fieldId] || ""}
      onChange={(e) => handleChange(field.fieldId, e.target.value)}
      placeholder="Pease type here..."
    />
  );
};

export default TextboxField;
