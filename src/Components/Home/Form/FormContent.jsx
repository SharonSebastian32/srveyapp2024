import FormField from "../../../Components/Home/Form/FormField";
import QuestionProgress from "../../../utils/Progressbar";
import AOS from "aos";
const FormContent = ({
  formMeta,
  questions,
  sections,
  currentPage,
  handleChange,
  handlePrevious,
  handleNext,
  handleSubmit,
  formData,
  selectedLanguage,
}) => {
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
    return <FormField key={question.fieldId} {...commonProps} />;
  };
  AOS.init();
  console.log("Questions: _needed_ones_", questions);

  let content;

  if (formMeta.paginationType === "OnePagePerQuestion") {
    const currentQuestion = questions[currentPage];
    const isLastQuestion = currentPage === questions.length - 1;
    const isFirstQuestion = currentPage === 0;

    content = (
      <form className="form-container" onSubmit={handleSubmit}>
        {currentQuestion && (
          <div className="question-container">
            <div>
              <div className="question-title">
                {console.log(currentQuestion.label)}
                <div
                  style={{
                    borderRadius:
                      currentQuestion.shape === "Circle" ? "50px" : "0px",
                    backgroundColor: currentQuestion.back_ground_color,
                    color: currentQuestion.font_color,
                    padding: "2px 15px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      currentQuestion.translations?.[selectedLanguage] ||
                      currentQuestion.label,
                  }}
                />
                <br />
              </div>
            </div>
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
            <button type="submit" className="submit-button" id="submit-btn">
              Submit
            </button>
          )}
        </div>
      </form>
    );
  } else if (formMeta.paginationType === "OnePageWithAllTheQuestions") {
    content = (
      <form
        className="form-container"
        onSubmit={handleSubmit}
        style={{ marginBottom: "50px" }}
        data-aos="fade-right"
      >
        {questions.map((question, index) => (
          <div
            key={question.id || index}
            className="question-container"
            data-aos="fade-right"
          >
            <div
              style={{
                borderRadius: question.shape === "Circle" ? "50px" : "0px",
                backgroundColor: question.back_ground_color,
                color: question.font_color,
                padding: "2px 15px",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  question.translations?.[selectedLanguage] || question.label,
              }}
            />

            <br />
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

    content = (
      <form
        className="form-container"
        onSubmit={handleSubmit}
        data-aos="fade-right"
      >
        {currentSection.questions.map((question) => (
          <div key={question.fieldId} className="question-container">
            <div
              style={{
                borderRadius: question.shape === "Circle" ? "50px" : "0px",
                backgroundColor: question.back_ground_color,
                color: question.font_color,
                padding: "2px 15px",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  question.translations?.[selectedLanguage] || question.label,
              }}
            />

            <br />
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

  const showProgressBar =
    formMeta.paginationType === "OnePagePerQuestion" ||
    formMeta.paginationType === "OnePagePerSection";

  return (
    <div style={{ position: "relative", marginBottom: "150px" }}>
      {content}
      {showProgressBar && (
        <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
          <QuestionProgress
            currentQuestion={currentPage}
            totalQuestions={
              formMeta.paginationType === "OnePagePerQuestion"
                ? questions.length
                : sections.length
            }
          />
        </div>
      )}
    </div>
  );
};

export default FormContent;
