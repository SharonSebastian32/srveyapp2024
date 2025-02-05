import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../../json/dynamicForm.json";
import "../../../styles//DynamicForm.css";
import Navbar from "../Header/Navbar";
import TextboxField from "../../Inputs/TextBox";
import EmailField from "../../Inputs/Email";
import DateField from "../../Inputs/Date";
import RadioField from "../../Inputs/Radio";
import SelectboxField from "../../Inputs/SelectBox";
import TextareaField from "../../Inputs/TextArea";
import MatrixCheckboxField from "../../Inputs/MatrixCheckBox";
import MatrixRadioField from "../../Inputs/MatrixRadio";
import MatrixRadioFeedbackField from "../../Inputs/MatrixRadioFeedback";
import MatrixFeedCheckbackField from "../../Inputs/MatrixFeedCheckBack";
import CheckboxField from "../../Inputs/CheckBox";

const DynamicForm = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState({});
  const [formMeta, setFormMeta] = useState({});
  const [initialFields, setInitialFields] = useState([]);
  const [sections, setSections] = useState([]);
  const [sectionFields, setSectionFields] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [allFields, setAllFields] = useState([]);

  useEffect(() => {
    const loadForm = () => {
      const currentForm = data.find((item) => item.formId === formId);

      if (currentForm) {
        const fieldsBySection = currentForm.fields.reduce((acc, field) => {
          acc[field.sectionId] = acc[field.sectionId] || [];
          acc[field.sectionId].push(field);
          return acc;
        }, {});

        const allFieldsCombined = [
          ...(currentForm.initialFields || []),
          ...(currentForm.fields || []),
        ];

        const initialData = allFieldsCombined.reduce((acc, field) => {
          acc[field.fieldId] = "";
          return acc;
        }, {});

        setFormMeta({
          formName: currentForm.formName,
          formDescription: currentForm.formDescription,
          typeOfListing: currentForm.typeOfListing,
          time: currentForm.time,
          languages: currentForm.languages,
        });
        setInitialFields(currentForm.initialFields || []);
        setSections(currentForm.sections || []);
        setSectionFields(fieldsBySection);
        setAllFields(allFieldsCombined);
        setFormData(initialData);

        console.log("Form data loaded:", currentForm);
      } else {
        console.error("Form not found for formId:", formId);
      }
    };

    loadForm();
  }, [formId]);

  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const renderField = (field) => {
    const label = field.translations?.[selectedLanguage] || field.label;
    const placeholder =
      field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

    switch (field.type) {
      case "textbox":
        return (
          <TextboxField
            field={field}
            formData={formData}
            handleChange={handleChange}
            selectedLanguage={selectedLanguage}
          />
        );
      case "email":
        return (
          <EmailField
            field={field}
            formData={formData}
            handleChange={handleChange}
            selectedLanguage={selectedLanguage}
          />
        );
      case "date":
        return (
          <DateField
            field={field}
            formData={formData}
            handleChange={handleChange}
          />
        );
      case "radio":
        return (
          <RadioField
            field={field}
            formData={formData}
            handleChange={handleChange}
            selectedLanguage={selectedLanguage}
          />
        );
      case "selectbox":
        return (
          <SelectboxField
            field={field}
            formData={formData}
            handleChange={handleChange}
            selectedLanguage={selectedLanguage}
          />
        );
      case "textarea":
        return (
          <TextareaField
            field={field}
            formData={formData}
            handleChange={handleChange}
            selectedLanguage={selectedLanguage}
          />
        );
      case "matrix_checkbox":
        return (
          <MatrixCheckboxField
            field={field}
            formData={formData}
            setFormData={setFormData}
            selectedLanguage={selectedLanguage}
          />
        );
      case "matrix_radio":
        return (
          <MatrixRadioField
            field={field}
            formData={formData}
            setFormData={setFormData}
            selectedLanguage={selectedLanguage}
          />
        );
      case "matrix_radio_feedback":
        return (
          <MatrixRadioFeedbackField
            field={field}
            formData={formData}
            setFormData={setFormData}
            selectedLanguage={selectedLanguage}
          />
        );
      case "matrix__feedcheckback":
        return (
          <MatrixFeedCheckbackField
            field={field}
            formData={formData}
            setFormData={setFormData}
            selectedLanguage={selectedLanguage}
          />
        );
      case "checkbox":
        return (
          <CheckboxField
            field={field}
            formData={formData}
            handleChange={handleChange}
            selectedLanguage={selectedLanguage}
          />
        );
      default:
        return null;
    }
  };

  const renderFormContent = () => {
    switch (formMeta.typeOfListing) {
      case "all-question":
        return (
          <form onSubmit={handleSubmit} className="form-container">
            {initialFields.length > 0 && (
              <div>
                <h3>Initial Questions</h3>
                {initialFields.map((field) => (
                  <div key={field.fieldId}>
                    <label htmlFor={field.fieldId}>
                      {field.translations?.[selectedLanguage] || field.label}
                      {field.required && "*"}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            )}
            {sections.map((section) => (
              <div key={section.sectionId}>
                {sectionFields[section.sectionId]?.map((field) => (
                  <div key={field.fieldId}>
                    <label htmlFor={field.fieldId}>
                      {field.translations?.[selectedLanguage] || field.label}
                      {field.required && "*"}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
                marginLeft: "auto",
              }}
            >
              <button id="single-sbmt-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        );
      case "one-page-per-section":
        const currentSection = sections[currentPage];
        const isLastSection = currentPage === sections.length - 1;
        const isFirstSection = currentPage === 0;

        return (
          <form
            onSubmit={isLastSection ? handleSubmit : (e) => e.preventDefault()}
            className="form-container"
          >
            <h3>{currentSection.sectionName}</h3>
            {sectionFields[currentSection.sectionId]?.map((field) => (
              <div key={field.fieldId}>
                <label htmlFor={field.fieldId}>
                  {field.translations?.[selectedLanguage] || field.label}
                  {field.required && "*"}
                </label>
                {renderField(field)}
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              {!isFirstSection && (
                <button
                  type="button"
                  id="previous-btn"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </button>
              )}

              {!isLastSection ? (
                <button
                  type="button"
                  id="next-btn"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              ) : (
                <button type="submit" id="submit-btn">
                  Submit
                </button>
              )}
            </div>
          </form>
        );
      case "one-page-per-question":
        const currentField = allFields[currentPage];
        const isLastQuestion = currentPage === allFields.length - 1;
        const isFirstQuestion = currentPage === 0;

        return (
          <form
            onSubmit={isLastQuestion ? handleSubmit : (e) => e.preventDefault()}
            className="form-container"
          >
            <div>
              <label htmlFor={currentField.fieldId}>
                {currentField.translations?.[selectedLanguage] ||
                  currentField.label}
                {currentField.required && "*"}
              </label>
              {renderField(currentField)}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              {!isFirstQuestion && (
                <button
                  type="button"
                  id="previous-btn"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </button>
              )}
              {!isLastQuestion ? (
                <button
                  type="button"
                  id="next-btn"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              ) : (
                <button id="submit-btn" type="submit">
                  Submit
                </button>
              )}
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />

      <div className="form-container">
        {/* <h2 className="form-title">{formMeta.formName}</h2> */}
        {/* <p>{formMeta.formDescription}</p> */}
        <select
          className="language-selector-combo"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {/* map less */}
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div style={{}}>{renderFormContent()}</div>
    </div>
  );
};

export default DynamicForm;
