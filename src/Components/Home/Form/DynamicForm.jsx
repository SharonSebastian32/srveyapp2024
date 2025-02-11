import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormQuestions, PostFormQuestion } from "../../../api/AxiosInstance";
import "../../../styles/Loader.css";
import "../../../styles/DynamicForm.css";
import Header from "../Header/Header";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormLoader from "../../../utils/Loader";

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

        console.log("API Response:", response.data);

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

        console.log("Processed Sections:", processedSections);

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

        console.log("Initial Form Data:", initialData);

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
      survey_id: parseInt(formId),
      attendees_answer: Object.keys(formData).map((fieldId) => ({
        id: 0,
        answer_type: "MultiplechoiceOneanswer", // This should be dynamically set based on the question type
        question_id: parseInt(fieldId.replace("question_", ""), 10),
        custom_answer:
          typeof formData[fieldId] === "string" ? formData[fieldId] : "string",
        choice_answer:
          typeof formData[fieldId] === "number" ? [formData[fieldId]] : [0],
        metrix_answer: [],
        staring: {
          id: 0,
          staring_id: 0,
          custom_rating: "string",
        },
        other_answer: "string",
        excel_answer: "string",
      })),
      initial_field: [
        {
          id: 0,
          initial_id: 0,
          custom_answer: "string",
          selection_answer: [0],
        },
      ],
      send_email_id: "user@example.com",
    };

    console.log("Transformed Data:", JSON.stringify(transformedData, null, 2)); // Add logging

    try {
      const response = await PostFormQuestion(transformedData);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  return (
    <div className="dynamic-form-wrapper">
      <Header />
      <FormHeader
        formMeta={formMeta}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      {isDataLoaded ? (
        <FormContent
          formMeta={formMeta}
          questions={questions}
          sections={sections}
          currentPage={currentPage}
          handleChange={handleChange}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleSubmit={handleSubmit}
          formData={formData}
          selectedLanguage={selectedLanguage}
        />
      ) : (
        <FormLoader />
      )}
    </div>
  );
};

export default DynamicForm;
