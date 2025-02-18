import { useState } from "react";
import FormField from "../../../Components/Home/Form/FormFIeld";
import QuestionProgress from "../../../utils/Progressbar";
import "../../../styles/Buttton.css";

const FormContent = ({
  formMeta,
  questions,
  sections,
  currentPage,
  handleChange,
  handleNext,
  handlePrevious,
  handleSubmit,
  formData,
  selectedLanguage,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false); 

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

    return <FormField {...commonProps} />;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await handleSubmit(e);
    setIsSubmitting(false);
  };

  const renderSubmitButton = () => {
    if (isSubmitting) {
      return (
        <button
          type="submit"
          className="submit-button"
          id="submit-btn"
          disabled
        >
          <span
            className="loading-spinner"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            Submitting...
            <div className="circle-loader"></div>
          </span>
        </button>
      );
    }
    return (
      <button type="submit" className="submit-button" id="submit-btn">
        Submit
      </button>
    );
  };

  if (formMeta.paginationType === "OnePagePerQuestion") {
    const currentQuestion = questions[currentPage];
    const isLastQuestion = currentPage === questions.length - 1;
    const isFirstQuestion = currentPage === 0;

    return (
      <>
        <form className="form-container" onSubmit={onSubmit}>
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
            {!isFirstQuestion && (
              <button type="button" id="previous-btn" onClick={handlePrevious}>
                Previous
              </button>
            )}

            {!isLastQuestion ? (
              <button type="button" id="next-button" onClick={handleNext}>
                Next
              </button>
            ) : (
              renderSubmitButton() // Render submit button with loading state
            )}
          </div>
        </form>

        <QuestionProgress
          currentQuestion={currentPage}
          totalQuestions={questions.length}
        />
      </>
    );
  } else if (formMeta.paginationType === "OnePageWithAllTheQuestions") {
    return (
      <form className="form-container" onSubmit={onSubmit}>
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
          {renderSubmitButton()}
        </div>
      </form>
    );
  } else if (formMeta.paginationType === "OnePagePerSection") {
    const currentSection = sections[currentPage];
    const isLastSection = currentPage === sections.length - 1;
    const isFirstSection = currentPage === 0;

    return (
      <>
        <form className="form-container" onSubmit={onSubmit}>
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
              renderSubmitButton()
            )}
          </div>
        </form>
        <QuestionProgress
          currentQuestion={currentPage}
          totalQuestions={questions.length}
        />
      </>
    );
  }

  return null;
};

export default FormContent;
