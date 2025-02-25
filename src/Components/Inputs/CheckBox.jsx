import IconComponent from "../../utils/Icons";
import AOS from "aos";
 const CheckBox = ({ field, formData, handleChange, selectedLanguage }) => {
  const onCheckboxChange = (optionValue) => {
    const currentSelections = formData[field.fieldId] || [];
    const newSelections = currentSelections.includes(optionValue)
      ? currentSelections.filter((value) => value !== optionValue)
      : [...currentSelections, optionValue];

    handleChange(field.fieldId, newSelections);
  };

  AOS.init();

  return (
    <div
      className="checkbox-group-1"
      style={{
        display: "flex",
        flexDirection: field.is_horizontal ? "row" : "column",
        flexWrap: "wrap",
        gap: "25px",
      }}
    >
      {field.options.map((option) => (
        <div
          key={option.value}
          id="checkbox-input-div"
          style={{
            display: "flex",
            alignItems: "flex-start",
            textAlign: "left",
            borderRadius: "5px",
             border: "1px solid #ccc",
            padding: "10px",
            position: "relative",
            width: "180px",
          }}
        >
          {option.image ? (
            <>
              <input
                type="checkbox"
                id={`${field.fieldId}-${option.value}`}
                name={field.fieldId}
                value={option.value}
                required
                checked={formData[field.fieldId]?.includes(option.value)}
                onChange={() => onCheckboxChange(option.value)}
                style={{
                  marginBottom: "5px",
                  marginRight: "8px",
                }}
              />
              <label
                htmlFor={`${field.fieldId}-${option.value}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                data-aos="zoom-in"
              >
                <img
                  id="radio-image"
                  src={option.image}
                  alt=""
                  style={{
                    width: "150px",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
              </label>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                id={`${field.fieldId}-${option.value}`}
                name={field.fieldId}
                value={option.value}
                required
                checked={formData[field.fieldId]?.includes(option.value)}
                onChange={() => onCheckboxChange(option.value)}
              />
              {option.emoji && (
                <IconComponent
                  iconName={option.emoji}
                  color={option.color}
                  style={{ paddingLeft: "5px" }}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
