import aos from "aos";
import { useEffect } from "react";
const Date = ({ field, formData, handleChange, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

  useEffect(() => {
    aos.init({
      once: true,
    });
  }, []);

  return (
    <input
      data-aos="fade-right"
      data-aos-duration="500"
      type="date"
      id={field.fieldId}
      name={field.fieldId}
      value={formData[field.fieldId] || ""}
      onChange={(e) => handleChange(field.fieldId, e.target.value)}
      placeholder={placeholder}
      required={field.required}
    />
  );
};

export default Date;
