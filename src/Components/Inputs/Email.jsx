const Email = ({ field, formData, handleChange, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (validateEmail(email)) {
      handleChange(field.fieldId, email);
    } else {
      handleChange(field.fieldId, "");
    }
  };

  return (
    <input
      type="email"
      id={field.fieldId}
      name={field.fieldId}
      value={formData[field.fieldId] || ""}
      onChange={handleEmailChange}
      placeholder={placeholder || "example@email.com"}
      required
    />
  );
};

export default Email;

