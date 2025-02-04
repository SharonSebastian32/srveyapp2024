const SelectBox = ({ field, formData, handleChange, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

  return (
    <div className="select-container">
      <select
        id={field.fieldId}
        name={field.fieldId}
        value={formData[field.fieldId] || ""}
        onChange={(e) => handleChange(field.fieldId, e.target.value)}
        required={field.required}
      >
        <option value="">{placeholder}</option>
        {field.options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.translations?.[selectedLanguage] || option.label}
          </option>
        ))}
      </select>
    </div>
  );
};


export default SelectBox;
