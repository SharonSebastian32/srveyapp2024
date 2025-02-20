const QuestionProgress = ({ currentQuestion, totalQuestions }) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div style={{ width: "100%", marginTop: "6rem", marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.25rem",
          fontSize: "0.875rem",
        }}
      >
        <span>
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div
        style={{
          width: "100%",
          height: "0.625rem",
          backgroundColor: "#ffff",
          borderRadius: "9999px",
        }}
      >
        <div
          style={{
            height: "0.625rem",
            backgroundColor: "black",
            borderRadius: "9999px",
            transition: "all 0.3s ease-in-out",
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

export default QuestionProgress;
