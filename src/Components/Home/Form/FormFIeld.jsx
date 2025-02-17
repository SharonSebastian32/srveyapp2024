import TextboxField from "../../Inputs/TextBox";
import DateField from "../../Inputs/Date";
import TextareaField from "../../Inputs/TextArea";
import MatrixRadioFeedback from "../../Inputs/MatrixRadioFeedback";
import CheckboxField from "../../Inputs/CheckBox";
import DateTime from "../../Inputs/DateTime";
import NumericalValue from "../../Inputs/NumericalValue";
import SelectBox from "../../Inputs/SelectBox";
import Radio from "../../Inputs/Radio";

const FormField = ({ field, formData, handleChange, selectedLanguage }) => {
  const commonProps = {
    field,
    formData,
    handleChange,
    selectedLanguage,
  };

  switch (field.type) {
    case "textbox":
      return <TextboxField {...commonProps} key={field.fieldId} />;
    case "numerical-value":
      return <NumericalValue {...commonProps} key={field.fieldId} />;
    case "textarea":
      return <TextareaField {...commonProps} key={field.fieldId} />;
    case "radio":
      return <Radio {...commonProps} key={field.fieldId} />;
    case "checkbox":
      return <CheckboxField {...commonProps} key={field.fieldId} />;
    case "date":
      return <DateField {...commonProps} key={field.fieldId} />;
    case "datetime-local":
      return <DateTime {...commonProps} key={field.fieldId} />;
    case "DropdownOneAnswer":
      return <SelectBox {...commonProps} key={field.fieldId} />;
    case "matrix_radio":
      return <MatrixRadioFeedback {...commonProps} key={field.fieldId} />;
    default:
      return null;
  }
};

export default FormField;
