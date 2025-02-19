import FormField from "../../../Components/Home/Form/FormFIeld";
import QuestionProgress from "../../../utils/Progressbar";
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

  console.log("Questions: _needed_ones_", questions);
  // const a = [];

  // for (let i = 0; i < questions.length; i++) {
  //   a.push(questions[i].font_color);
  // }
  // console.log(a);

  if (formMeta.paginationType === "OnePagePerQuestion") {
    const currentQuestion = questions[currentPage];
    const isLastQuestion = currentPage === questions.length - 1;
    const isFirstQuestion = currentPage === 0;

    return (
      <>
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
        <QuestionProgress
          currentQuestion={currentPage}
          totalQuestions={questions.length}
        />
      </>
    );
  } else if (formMeta.paginationType === "OnePageWithAllTheQuestions") {
    return (
      <form className="form-container" onSubmit={handleSubmit} style={{}}>
        {questions.map((question, index) => (
          <div key={question.id || index} className="question-container">
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

    return (
      <>
        <form className="form-container" onSubmit={handleSubmit}>
          {currentSection.questions.map((question) => (
            <div key={question.fieldId} className="question-container">
              {/* <h3 className="question-title" style={{ color: titleColor }}>
                {question.translations?.[selectedLanguage] || question.label}
                {question.required && <span className="required-mark">*</span>}
              </h3> */}

              <div
                style={{
                  borderRadius: br_Radius,
                  backgroundColor: bgColor,
                  color: titleColor,
                  padding: "2px 15px",
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    question.translations?.[selectedLanguage] || question.label,
                }}
              />
              <br />
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
