import aos from "aos";
import { useEffect } from "react";
const Date = ({ field, formData, handleChange, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;
  console.log(field.id);

  useEffect(() => {
    aos.init({
      once: true,
    });
  }, []);

  return (
    <input
      type="date"
      id={field.fieldId}
      name={field.fieldId}
      value={formData[field.fieldId]}
      onChange={(e) => handleChange(field.fieldId, e.target.value)}
      placeholder={placeholder}
      required
    />
  );
};

export default Date;
