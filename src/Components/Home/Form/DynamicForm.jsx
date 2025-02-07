import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormQuestions } from "../../../Api/AxiosApiInstance";
import "../../../styles/Loader.css";
import "../../../styles/DynamicForm.css";
import Header from "../Header/Header";
import TextboxField from "../../Inputs/TextBox";
import DateField from "../../Inputs/Date";
import RadioField from "../../Inputs/Radio";
import TextareaField from "../../Inputs/TextArea";
import MatrixRadioFeedback from "../../Inputs/MatrixRadioFeedback";
import CheckboxField from "../../Inputs/CheckBox";
import DateTime from "../../Inputs/DateTime";
import NumericalValue from "../../Inputs/NumericalValue";
import SelectBox from "../../Inputs/SelectBox";

const DynamicForm = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState({});
  const [formMeta, setFormMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("1");
  const [questions, setQuestions] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const response = await getFormQuestions(formId);

        if (!response || !response.data) {
          console.error("Invalid response format");
          return;
        }

        const processedQuestions = response.data.map((item) => {
          const question = item.question;
          return {
            id: item.id,
            fieldId: `question_${item.id}`,
            type: mapQuestionType(question.question_type),
            label: item.english_title.replace(/<[^>]*>/g, ""),
            required: question.is_mandatory,
            placeholder: question.place_holder,
            options: processQuestionOptions(question),
            matrixData: processMatrixData(question),
            translations: processTranslations(item),
            feedback: question.is_feedback,
            validations: {
              max: question.max_limit,
              min: question.min_limit,
              error: question.validation_error,
            },
          };
        });

        console.log("Processed Questions:", processedQuestions);

        setQuestions(processedQuestions);
        setFormMeta({
          formName: response.option.english_title,
          paginationType: response.option.pagination_type,
          survey_languages: response.option.survey_languages || [],
          isBackAllowed: response.option.is_back_button,
          timeLimited: response.option.is_survey_time_limit,
          timeLimit: response.option.survey_time_limit,
        });

        const initialData = processedQuestions.reduce((acc, question) => {
          if (question.type === "matrix_radio") {
            // Initialize matrix data structure
            acc[question.fieldId] = {};
            question.matrixData.rows.forEach((row) => {
              acc[question.fieldId][row.id] = "";
            });
          } else {
            acc[question.fieldId] = "";
          }
          return acc;
        }, {});

        setFormData(initialData);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    loadForm();
  }, [formId]);

  const mapQuestionType = (type) => {
    const typeMap = {
      SingleLineTextBox: "textbox",
      MultipleLinesTextBox: "textarea",
      MultiplechoiceOneanswer: "radio",
      MultiplechoiceManyanswers: "checkbox",
      Date: "date",
      Datetime: "datetime-local",
      NumericalValue: "numerical-value",
      Matrix: "matrix_radio",
    };
    return typeMap[type] || "textbox";
  };

  const processQuestionOptions = (question) => {
    if (!question.answer_title_language) return [];

    return question.answer_title_language.map((answer) => ({
      value: answer.pk.toString(),
      label: answer.english_answer,
      translations: answer.other_answer.reduce((acc, trans) => {
        acc[trans.language] = trans.answer;
        return acc;
      }, {}),
    }));
  };

  const processMatrixData = (question) => {
    if (question.question_type !== "Matrix") return null;

    return {
      fieldId: `question_${question.id}`,
      rows: question.matrix_row.map((row) => ({
        id: row.pk.toString(),
        label: row.row,
        translations: row.other_rows.reduce((acc, trans) => {
          acc[trans.language] = trans.row;
          return acc;
        }, {}),
      })),
      columns: question.matrix_column.map((col) => ({
        id: col.pk.toString(),
        label: col.column,
        translations: col.other_columns.reduce((acc, trans) => {
          acc[trans.language] = trans.column;
          return acc;
        }, {}),
      })),
      required: question.is_mandatory,
      feedback: question.is_feedback,
    };
  };

  const processTranslations = (item) => {
    return item.section_other_title.other_title.reduce((acc, trans) => {
      acc[trans.language] = trans.name.replace(/<[^>]*>/g, "");
      return acc;
    }, {});
  };

  const renderField = (question) => {
    const commonProps = {
      key: question.fieldId,
      field: {
        ...question,
        translations: question.translations,
        ...question.matrixData,
      },
      formData: formData,
      setFormData: setFormData,
      selectedLanguage: selectedLanguage,
    };

    console.log(`Rendering field type: ${question.type}`, commonProps);

    switch (question.type) {
      case "textbox":
        return <TextboxField {...commonProps} />;
      case "numerical-value":
        return <NumericalValue {...commonProps} />;
      case "textarea":
        return <TextareaField {...commonProps} />;
      case "radio":
        return <RadioField {...commonProps} />;
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
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your submission logic here
  };

  const renderFormContent = () => {
    if (!isDataLoaded) {
      return (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      );
    }

    if (formMeta.paginationType === "OnePagePerQuestion") {
      const currentQuestion = questions[currentPage];
      const isLastQuestion = currentPage === questions.length - 1;
      const isFirstQuestion = currentPage === 0;

      return (
        <form
          onSubmit={isLastQuestion ? handleSubmit : (e) => e.preventDefault()}
          className="form-container"
        >
          {currentQuestion && (
            <div className="question-container">
              <h3 className="question-title">
                {currentQuestion.translations?.[selectedLanguage] ||
                  currentQuestion.label}
                {currentQuestion.required && (
                  <span className="required-mark">*</span>
                )}
              </h3>
              {renderField(currentQuestion)}
            </div>
          )}

          <div className="navigation-buttons">
            {formMeta.isBackAllowed && !isFirstQuestion && (
              <button
                type="button"
                className="previous-button"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
            )}

            {!isLastQuestion ? (
              <button
                type="button"
                className="next-button"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="submit-button">
                Submit
              </button>
            )}
          </div>
        </form>
      );
    }

    return null;
  };

  return (
    <div className="dynamic-form-wrapper">
      <Header />

      <div className="form-header">
        <h2 className="form-title">{formMeta.formName}</h2>

        {formMeta.survey_languages?.length > 0 && (
          <select
            className="language-selector"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {formMeta.survey_languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {renderFormContent()}
    </div>
  );
};

export default DynamicForm;
