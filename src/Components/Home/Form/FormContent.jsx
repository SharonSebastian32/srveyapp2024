import { useState, useEffect, useRef, useCallback } from "react";
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
  const [remainingTime, setRemainingTime] = useState(null);
  const timerIntervalRef = useRef(null);
  const timerEndedRef = useRef(false);
  const initialTimeRef = useRef(null);
  const startTimeRef = useRef(null);

  const formatTime = useCallback((timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const parseTimeToSeconds = useCallback((timeString) => {
    if (!timeString) return 0;

    const parts = timeString.split(":");
    if (parts.length === 3) {
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      return hours * 3600 + minutes * 60 + seconds;
    }
    return 0;
  }, []);

  useEffect(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    timerEndedRef.current = false;

    if (formMeta.paginationType === "OnePagePerQuestion") {
      const currentQuestion = questions[currentPage];
      if (currentQuestion && currentQuestion.timer) {
        const totalSeconds = parseTimeToSeconds(currentQuestion.timer);
        initialTimeRef.current = totalSeconds; // Store initial time
        setRemainingTime(totalSeconds);
        startTimeRef.current = Date.now(); // Record the start time

        timerIntervalRef.current = setInterval(() => {
          const elapsedSeconds = Math.floor(
            (Date.now() - startTimeRef.current) / 1000
          );
          const newRemainingTime = Math.max(
            0,
            initialTimeRef.current - elapsedSeconds
          );

          setRemainingTime(newRemainingTime);

          if (newRemainingTime <= 0) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;

            if (currentPage < questions.length - 1 && !timerEndedRef.current) {
              timerEndedRef.current = true;
              handleNext();
            }
          }
        }, 1000);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [
    currentPage,
    questions,
    formMeta.paginationType,
    handleNext,
    parseTimeToSeconds,
  ]);

  const renderField = useCallback(
    (question) => {
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
    },
    [formData, handleChange, selectedLanguage]
  );

  AOS.init();

  let content;

  if (formMeta.paginationType === "OnePagePerQuestion") {
    const currentQuestion = questions[currentPage];
    const isLastQuestion = currentPage === questions.length - 1;
    const isFirstQuestion = currentPage === 0;

    content = (
      <form
        className="form-container"
        onSubmit={handleSubmit}
        data-aos="fade-right"
      >
        {currentQuestion && (
          <div className="question-container">
            <div>
              <div className="question-title">
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
        {currentQuestion?.timer ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              marginTop: "300px",
              justifyContent: "flex-end",
            }}
          >
            <span
              style={{
                position: "fixed",
                color: "black",
                borderRadius: "50%",
                display: "inline-block",
                width: "100px",
                height: "100px",
                backgroundColor: "rgba(255, 255, 255, 0.97)",
                textAlign: "center",
                lineHeight: "100px",
                fontSize: "24px",
                fontFamily: "Poppins",
                border: `10px solid ${currentQuestion.back_ground_color}`,
              }}
            >
              {remainingTime !== null
                ? formatTime(remainingTime)
                : currentQuestion.timer}
            </span>
          </div>
        ) : null}
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
