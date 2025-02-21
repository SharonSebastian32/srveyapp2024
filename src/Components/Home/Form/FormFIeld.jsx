import TextboxField from "../../Inputs/TextBox";
import DateField from "../../Inputs/Date";
import TextareaField from "../../Inputs/TextArea";
import MatrixRadioFeedback from "../../Inputs/MatrixRadioFeedback";
import CheckboxField from "../../Inputs/CheckBox";
import DateTime from "../../Inputs/DateTime";
import NumericalValue from "../../Inputs/NumericalValue";
import SelectBox from "../../Inputs/SelectBox";
import Radio from "../../Inputs/Radio";
import Rating from "../../Inputs/Rating";
const FormField = ({ field, formData, handleChange, selectedLanguage }) => {
  const commonProps = {
    field,
    formData,
    handleChange,
    selectedLanguage,
  };

  switch (field.type) {
    case "textbox":
      return <TextboxField {...commonProps} />;
    case "numerical-value":
      return <NumericalValue {...commonProps} />;
    case "textarea":
      return <TextareaField {...commonProps} />;
    case "radio":
      return <Radio {...commonProps} />;
    case "checkbox":
      return <CheckboxField {...commonProps} />;
    case "date":
      return <DateField {...commonProps} />;
    case "datetime-local":
      return <DateTime {...commonProps} />;
    case "DropdownOneAnswer":
      return <SelectBox {...commonProps} />;
    case "matrix_radio":
      return <MatrixRadioFeedback {...commonProps} />;
    case "Rating":
      return <Rating {...commonProps} />;
    default:
      return null;
  }
};

export default FormField;
