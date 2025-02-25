const TextArea = ({ field, formData, handleChange, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

  const showError = !formData[field.fieldId];

  return (
    <>
      <textarea
        id={field.fieldId}
        name={field.fieldId}
        value={formData[field.fieldId] || ""}
        onChange={(e) => handleChange(field.fieldId, e.target.value)}
        placeholder={placeholder || "Please text here...."}
        required={field.required}
      />
      {showError && (
        <p style={{ color: "red" }}>
          Please fill this field
        </p>
      )}
    </>
  );
};

export default TextArea;

