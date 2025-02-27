const TextboxField = ({ field, formData, handleChange, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

  const hasError =
    formData[field.fieldId] === undefined || formData[field.fieldId] === "";
  console.log("required", field.is_mandatory);
  return (
    <>
      <input
        type="text"
        id={field.fieldId}
        name={field.fieldId}
        value={formData[field.fieldId] || ""}
        onChange={(e) => handleChange(field.fieldId, e.target.value)}
        placeholder={placeholder}
        required={field.is_mandatory}
      />
      {hasError && <p style={{ color: "red" }}>Please fill this field</p>}
    </>
  );
};

export default TextboxField;
