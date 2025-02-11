import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormQuestions, PostFormQuestion } from "../../../Api/AxiosInstance";
import "../../../styles/Loader.css";
import "../../../styles/DynamicForm.css";
import Header from "../Header/Header";
import TextboxField from "../../Inputs/TextBox";
import DateField from "../../Inputs/Date";
import TextareaField from "../../Inputs/TextArea";
import MatrixRadioFeedback from "../../Inputs/MatrixRadioFeedback";
import CheckboxField from "../../Inputs/CheckBox";
import DateTime from "../../Inputs/DateTime";
import NumericalValue from "../../Inputs/NumericalValue";
import SelectBox from "../../Inputs/SelectBox";
import FormLoader from "../../../utils/Loader";
import Radio from "../../Inputs/Radio";

const DynamicForm = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState({});
  const [formMeta, setFormMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("1");
  const [questions, setQuestions] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [sections, setSections] = useState([]);

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
      fieldId: `${question.id}`,
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
    if (!item?.section_other_title?.other_title) return {};
    return item.section_other_title.other_title.reduce((acc, trans) => {
      acc[trans.language] = trans.name.replace(/<[^>]*>/g, "");
      return acc;
    }, {});
  };

  const processQuestion = (question) => {
    return {
      id: question.id,
      fieldId: `question_${question.id}`,
      type: mapQuestionType(question.question_type),
      label:
        question.question_title_language?.name?.replace(/<[^>]*>/g, "") || "",
      required: question.is_mandatory,
      placeholder: question.place_holder,
      options: processQuestionOptions(question),
      matrixData: processMatrixData(question),
      translations: processTranslations({
        section_other_title: {
          other_title: question.question_title_language?.other_title || [],
        },
      }),
      feedback: question.is_feedback,
      validations: {
        max: question.max_limit,
        min: question.min_limit,
        error: question.validation_error,
      },
    };
  };

  useEffect(() => {
    const loadForm = async () => {
      try {
        const response = await getFormQuestions(formId);

        if (!response || !response.data) {
          console.error("Data not found");
          return;
        }

        const processedSections = response.data.reduce((acc, item) => {
          if (item.types === "Section") {
            const sectionQuestions = (item.question || []).map(processQuestion);
            acc.push({
              id: item.id,
              title: item.english_title,
              translations: processTranslations(item),
              questions: sectionQuestions,
            });
          } else if (item.types === "Question") {
            acc.push({
              id: item.id,
              title: item.english_title,
              translations: processTranslations(item),
              questions: [processQuestion(item.question)],
            });
          }
          return acc;
        }, []);

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

        const initialData = {};
        processedSections.forEach((section) => {
          section.questions.forEach((question) => {
            if (question.type === "matrix_radio") {
              initialData[question.fieldId] = {};
              question.matrixData?.rows?.forEach((row) => {
                initialData[question.fieldId][row.id] = "";
              });
            } else if (question.type === "checkbox") {
              initialData[question.fieldId] = [];
            } else {
              initialData[question.fieldId] = "";
            }
          });
        });

        setQuestions(processedQuestions);
        setSections(processedSections);
        setFormData(initialData);
        setFormMeta({
          formName: response.option.english_title,
          paginationType: response.option.pagination_type,
          survey_languages: response.option.survey_languages || [],
          isBackAllowed: response.option.is_back_button,
          timeLimited: response.option.is_survey_time_limit,
          timeLimit: response.option.survey_time_limit,
        });
        setIsDataLoaded(true);
      } catch (error) {
        console.log("Error fetching form data:", error);
      }
    };

    loadForm();
  }, [formId]);

  const handleChange = (fieldId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldId]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transformedData = {
      survey_id: formId,
      responses: Object.keys(formData).map((fieldId) => ({
        question_id: fieldId.replace("question_", ""),
        answer: formData[fieldId],
      })),
    };

    try {
      const response = await PostFormQuestion(transformedData);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
      handleChange: handleChange,
      selectedLanguage: selectedLanguage,
    };

    switch (question.type) {
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
      default:
        return null;
    }
  };

  const renderFormContent = () => {
    if (!isDataLoaded) {
      return <FormLoader />;
    }

    if (formMeta.paginationType === "OnePagePerQuestion") {
      const currentQuestion = questions[currentPage];
      const isLastQuestion = currentPage === questions.length - 1;
      const isFirstQuestion = currentPage === 0;

      return (
        <>
          <form className="form-container" onSubmit={handleSubmit}>
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

            <div className="navigation-buttons" style={{ marginTop: "24px" }}>
              {formMeta.isBackAllowed && !isFirstQuestion && (
                <button
                  type="button"
                  id="previous-btn"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              )}

              {!isLastQuestion ? (
                <button type="button" id="next-button" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <button type="submit" className="submit-button" id="submit-btn">
                  Submit
                </button>
              )}
            </div>
          </form>
        </>
      );
    } else if (formMeta.paginationType === "OnePageWithAllTheQuestions") {
      return (
        <form className="form-container" onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={question.id || index} className="question-container">
              <h3 className="question-title">
                {question.translations?.[selectedLanguage] || question.label}
                {question.required && <span className="required-mark">*</span>}
              </h3>
              {renderField(question)}
            </div>
          ))}

          <div className="navigation-buttons" style={{ marginTop: "24px" }}>
            <button type="submit" className="submit-button" id="submit-btn">
              Submit
            </button>
          </div>
        </form>
      );
    } else if (formMeta.paginationType === "OnePagePerSection") {
      const currentSection = sections[currentPage];
      const isLastSection = currentPage === sections.length - 1;
      const isFirstSection = currentPage === 0;

      return (
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="section-header">
            <h3 className="section-title">
              {currentSection.translations?.[selectedLanguage] ||
                currentSection.title}
            </h3>
          </div>

          {currentSection.questions.map((question) => (
            <div key={question.fieldId} className="question-container">
              <h3 className="question-title">
                {question.translations?.[selectedLanguage] || question.label}
                {question.required && <span className="required-mark">*</span>}
              </h3>
              {renderField(question)}
            </div>
          ))}

          <div className="navigation-buttons" style={{ marginTop: "24px" }}>
            {formMeta.isBackAllowed && !isFirstSection && (
              <button type="button" id="previous-btn" onClick={handlePrevious}>
                Previous
              </button>
            )}

            {!isLastSection ? (
              <button type="button" id="next-button" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="submit" className="submit-button" id="submit-btn">
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
      <div className="form-container">
        <h2 className="form-title" data-aos="fade-right">
          {formMeta.formName}
        </h2>
        {formMeta.survey_languages?.length > 0 && (
          <select
            className="language-selector-combo"
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
