// import FormField from "../../../Components/Home/Form/FormField";
// import QuestionProgress from "../../../utils/Progressbar";

// import AOS from "aos";
// const FormContent = ({
//   formMeta,
//   questions,
//   sections,
//   currentPage,
//   handleChange,
//   handlePrevious,
//   handleNext,
//   handleSubmit,
//   formData,
//   selectedLanguage,
// }) => {
//   const renderField = (question) => {
//     const commonProps = {
//       key: question.fieldId,
//       field: {
//         ...question,
//         translations: question.translations,
//         ...question.matrixData,
//       },
//       formData: formData,
//       handleChange: handleChange,
//       selectedLanguage: selectedLanguage,
//     };
//     return <FormField key={question.fieldId} {...commonProps} />;
//   };
//   AOS.init();
//   console.log("Questions: _needed_ones_", questions);

//   let content;

//   if (formMeta.paginationType === "OnePagePerQuestion") {
//     const currentQuestion = questions[currentPage];
//     const isLastQuestion = currentPage === questions.length - 1;
//     const isFirstQuestion = currentPage === 0;

//     content = (
//       <form
//         className="form-container"
//         onSubmit={handleSubmit}
//         data-aos="fade-right"
//       >
//         {currentQuestion && (
//           <div className="question-container">
//             <div>
//               <div className="question-title">
//                 {console.log(currentQuestion.label)}
//                 <div
//                   style={{
//                     borderRadius:
//                       currentQuestion.shape === "Circle" ? "50px" : "0px",
//                     backgroundColor: currentQuestion.back_ground_color,
//                     color: currentQuestion.font_color,
//                     padding: "2px 15px",
//                   }}
//                   dangerouslySetInnerHTML={{
//                     __html:
//                       currentQuestion.translations?.[selectedLanguage] ||
//                       currentQuestion.label,
//                   }}
//                 />
//                 <br />
//               </div>
//             </div>
//             {renderField(currentQuestion)}
//           </div>
//         )}
//         <div className="navigation-buttons" style={{ marginTop: "24px" }}>
//           {!isFirstQuestion && (
//             <button type="button" id="previous-btn" onClick={handlePrevious}>
//               Previous
//             </button>
//           )}
//           {!isLastQuestion ? (
//             <button type="button" id="next-button" onClick={handleNext}>
//               Next
//             </button>
//           ) : (
//             <button type="submit" className="submit-button" id="submit-btn">
//               Submit
//             </button>
//           )}
//         </div>
//         {currentQuestion.timer ? (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "flex-end",
//               marginTop: "150px",
//               justifyContent: "flex-end",
//             }}
//           >
//             <span
//               style={{
//                 position: "fixed",
//                 color: "black",
//                 borderRadius: "50%",
//                 display: "inline-block",
//                 width: "100px",
//                 height: "100px",
//                 backgroundColor: "rgba(255, 255, 255, 0.97)",
//                 textAlign: "center",
//                 lineHeight: "100px",
//                 fontSize: "24px",
//                 fontFamily: "Poppins",
//                 border: `10px solid   ${currentQuestion.back_ground_color}`,
//               }}
//             >
//               {currentQuestion.timer}
//             </span>
//           </div>
//         ) : null}
//       </form>
//     );
//   }
//   else if (formMeta.paginationType === "OnePageWithAllTheQuestions") {
//     content = (
//       <form
//         className="form-container"
//         onSubmit={handleSubmit}
//         style={{ marginBottom: "50px" }}
//         data-aos="fade-right"
//       >
//         {questions.map((question, index) => (
//           <div
//             key={question.id || index}
//             className="question-container"
//             data-aos="fade-right"
//           >
//             <div
//               style={{
//                 borderRadius: question.shape === "Circle" ? "50px" : "0px",
//                 backgroundColor: question.back_ground_color,
//                 color: question.font_color,
//                 padding: "2px 15px",
//               }}
//               dangerouslySetInnerHTML={{
//                 __html:
//                   question.translations?.[selectedLanguage] || question.label,
//               }}
//             />

//             <br />

//             {renderField(question)}
//           </div>
//         ))}
//         <div className="navigation-buttons" style={{ marginTop: "24px" }}>
//           <button type="submit" className="submit-button" id="submit-btn">
//             Submit
//           </button>
//         </div>
//       </form>
//     );
//   } else if (formMeta.paginationType === "OnePagePerSection") {
//     const currentSection = sections[currentPage];
//     const isLastSection = currentPage === sections.length - 1;
//     const isFirstSection = currentPage === 0;
//     content = (
//       <form
//         className="form-container"
//         onSubmit={handleSubmit}
//         data-aos="fade-right"
//       >
//         {currentSection.questions.map((question) => (
//           <div key={question.fieldId} className="question-container">
//             <div
//               style={{
//                 borderRadius: question.shape === "Circle" ? "50px" : "0px",
//                 backgroundColor: question.back_ground_color,
//                 color: question.font_color,
//                 padding: "2px 15px",
//               }}
//               dangerouslySetInnerHTML={{
//                 __html:
//                   question.translations?.[selectedLanguage] || question.label,
//               }}
//             />

//             <br />
//             {renderField(question)}
//           </div>
//         ))}

//         <div className="navigation-buttons" style={{ marginTop: "24px" }}>
//           {formMeta.isBackAllowed && !isFirstSection && (
//             <button type="button" id="previous-btn" onClick={handlePrevious}>
//               Previous
//             </button>
//           )}
//           {!isLastSection ? (
//             <button type="button" id="next-button" onClick={handleNext}>
//               Next
//             </button>
//           ) : (
//             <button type="submit" className="submit-button" id="submit-btn">
//               Submit
//             </button>
//           )}
//         </div>
//       </form>
//     );
//   }

//   const showProgressBar =
//     formMeta.paginationType === "OnePagePerQuestion" ||
//     formMeta.paginationType === "OnePagePerSection";

//   return (
//     <div style={{ position: "relative", marginBottom: "150px" }}>
//       {content}
//       {showProgressBar && (
//         <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
//           <QuestionProgress
//             currentQuestion={currentPage}
//             totalQuestions={
//               formMeta.paginationType === "OnePagePerQuestion"
//                 ? questions.length
//                 : sections.length
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormContent;

// import { useState, useEffect } from "react";
// import FormField from "../../../Components/Home/Form/FormField";
// import QuestionProgress from "../../../utils/Progressbar";
// import AOS from "aos";

// const FormContent = ({
//   formMeta,
//   questions,
//   sections,
//   currentPage,
//   handleChange,
//   handlePrevious,
//   handleNext,
//   handleSubmit,
//   formData,
//   selectedLanguage,
// }) => {
//   // Timer state
//   const [remainingTime, setRemainingTime] = useState(null);

//   // Format time as HH:MM:SS
//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;

//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const parseTimeToSeconds = (timeString) => {
//     if (!timeString) return 0;

//     const parts = timeString.split(":");
//     if (parts.length === 3) {
//       const hours = parseInt(parts[0], 10);
//       const minutes = parseInt(parts[1], 10);
//       const seconds = parseInt(parts[2], 10);
//       return hours * 3600 + minutes * 60 + seconds;
//     }
//     return 0;
//   };

//   useEffect(() => {
//     if (formMeta.paginationType === "OnePagePerQuestion") {
//       const currentQuestion = questions[currentPage];
//       if (currentQuestion && currentQuestion.timer) {
//         const totalSeconds = parseTimeToSeconds(currentQuestion.timer);
//         setRemainingTime(totalSeconds);

//         const timerInterval = setInterval(() => {
//           setRemainingTime((prevTime) => {
//             if (prevTime <= 1) {
//               clearInterval(timerInterval);

//               return 0;
//             }
//             return prevTime - 1;
//           });
//         }, 1000);

//         return () => clearInterval(timerInterval);
//       }
//     }
//   }, [currentPage, questions, formMeta.paginationType]);

//   const renderField = (question) => {
//     const commonProps = {
//       key: question.fieldId,
//       field: {
//         ...question,
//         translations: question.translations,
//         ...question.matrixData,
//       },
//       formData: formData,
//       handleChange: handleChange,
//       selectedLanguage: selectedLanguage,
//     };
//     return <FormField key={question.fieldId} {...commonProps} />;
//   };

//   AOS.init();
//   console.log("Questions: _needed_ones_", questions);

//   let content;

//   if (formMeta.paginationType === "OnePagePerQuestion") {
//     const currentQuestion = questions[currentPage];
//     const isLastQuestion = currentPage === questions.length - 1;
//     const isFirstQuestion = currentPage === 0;

//     content = (
//       <form
//         className="form-container"
//         onSubmit={handleSubmit}
//         data-aos="fade-right"
//       >
//         {currentQuestion && (
//           <div className="question-container">
//             <div>
//               <div className="question-title">
//                 {console.log(currentQuestion.label)}
//                 <div
//                   style={{
//                     borderRadius:
//                       currentQuestion.shape === "Circle" ? "50px" : "0px",
//                     backgroundColor: currentQuestion.back_ground_color,
//                     color: currentQuestion.font_color,
//                     padding: "2px 15px",
//                   }}
//                   dangerouslySetInnerHTML={{
//                     __html:
//                       currentQuestion.translations?.[selectedLanguage] ||
//                       currentQuestion.label,
//                   }}
//                 />
//                 <br />
//               </div>
//             </div>
//             {renderField(currentQuestion)}
//           </div>
//         )}
//         <div className="navigation-buttons" style={{ marginTop: "24px" }}>
//           {!isFirstQuestion && (
//             <button type="button" id="previous-btn" onClick={handlePrevious}>
//               Previous
//             </button>
//           )}
//           {!isLastQuestion ? (
//             <button type="button" id="next-button" onClick={handleNext}>
//               Next
//             </button>
//           ) : (
//             <button type="submit" className="submit-button" id="submit-btn">
//               Submit
//             </button>
//           )}
//         </div>
//         {currentQuestion.timer ? (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "flex-end",
//               marginTop: "150px",
//               justifyContent: "flex-end",
//             }}
//           >
//             <span
//               style={{
//                 position: "fixed",
//                 color: "black",
//                 borderRadius: "50%",
//                 display: "inline-block",
//                 width: "100px",
//                 height: "100px",
//                 backgroundColor: "rgba(255, 255, 255, 0.97)",
//                 textAlign: "center",
//                 lineHeight: "100px",
//                 fontSize: "24px",
//                 fontFamily: "Poppins",
//                 border: `10px solid ${currentQuestion.back_ground_color}`,
//               }}
//             >
//               {remainingTime !== null
//                 ? formatTime(remainingTime)
//                 : currentQuestion.timer}
//             </span>
//           </div>
//         ) : null}
//       </form>
//     );
//   } else if (formMeta.paginationType === "OnePageWithAllTheQuestions") {
//     content = (
//       <form
//         className="form-container"
//         onSubmit={handleSubmit}
//         style={{ marginBottom: "50px" }}
//         data-aos="fade-right"
//       >
//         {questions.map((question, index) => (
//           <div
//             key={question.id || index}
//             className="question-container"
//             data-aos="fade-right"
//           >
//             <div
//               style={{
//                 borderRadius: question.shape === "Circle" ? "50px" : "0px",
//                 backgroundColor: question.back_ground_color,
//                 color: question.font_color,
//                 padding: "2px 15px",
//               }}
//               dangerouslySetInnerHTML={{
//                 __html:
//                   question.translations?.[selectedLanguage] || question.label,
//               }}
//             />

//             <br />

//             {renderField(question)}
//           </div>
//         ))}
//         <div className="navigation-buttons" style={{ marginTop: "24px" }}>
//           <button type="submit" className="submit-button" id="submit-btn">
//             Submit
//           </button>
//         </div>
//       </form>
//     );
//   } else if (formMeta.paginationType === "OnePagePerSection") {
//     const currentSection = sections[currentPage];
//     const isLastSection = currentPage === sections.length - 1;
//     const isFirstSection = currentPage === 0;
//     content = (
//       <form
//         className="form-container"
//         onSubmit={handleSubmit}
//         data-aos="fade-right"
//       >
//         {currentSection.questions.map((question) => (
//           <div key={question.fieldId} className="question-container">
//             <div
//               style={{
//                 borderRadius: question.shape === "Circle" ? "50px" : "0px",
//                 backgroundColor: question.back_ground_color,
//                 color: question.font_color,
//                 padding: "2px 15px",
//               }}
//               dangerouslySetInnerHTML={{
//                 __html:
//                   question.translations?.[selectedLanguage] || question.label,
//               }}
//             />

//             <br />
//             {renderField(question)}
//           </div>
//         ))}

//         <div className="navigation-buttons" style={{ marginTop: "24px" }}>
//           {formMeta.isBackAllowed && !isFirstSection && (
//             <button type="button" id="previous-btn" onClick={handlePrevious}>
//               Previous
//             </button>
//           )}
//           {!isLastSection ? (
//             <button type="button" id="next-button" onClick={handleNext}>
//               Next
//             </button>
//           ) : (
//             <button type="submit" className="submit-button" id="submit-btn">
//               Submit
//             </button>
//           )}
//         </div>
//       </form>
//     );
//   }

//   const showProgressBar =
//     formMeta.paginationType === "OnePagePerQuestion" ||
//     formMeta.paginationType === "OnePagePerSection";

//   return (
//     <div style={{ position: "relative", marginBottom: "150px" }}>
//       {content}
//       {showProgressBar && (
//         <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
//           <QuestionProgress
//             currentQuestion={currentPage}
//             totalQuestions={
//               formMeta.paginationType === "OnePagePerQuestion"
//                 ? questions.length
//                 : sections.length
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormContent;

// import { useState, useEffect } from "react";
// import FormField from "../../../Components/Home/Form/FormField";
// import QuestionProgress from "../../../utils/Progressbar";
// import AOS from "aos";

// const FormContent = ({
//   formMeta,
//   questions,
//   sections,
//   currentPage,
//   handleChange,
//   handlePrevious,
//   handleNext,
//   handleSubmit,
//   formData,
//   selectedLanguage,
// }) => {
//   // Timer state
//   const [remainingTime, setRemainingTime] = useState(null);

//   // Format time as HH:MM:SS
//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;

//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   // Parse time string (HH:MM:SS) to seconds
//   const parseTimeToSeconds = (timeString) => {
//     if (!timeString) return 0;

//     const parts = timeString.split(":");
//     if (parts.length === 3) {
//       const hours = parseInt(parts[0], 10);
//       const minutes = parseInt(parts[1], 10);
//       const seconds = parseInt(parts[2], 10);
//       return hours * 3600 + minutes * 60 + seconds;
//     }
//     return 0;
//   };

//   // Timer logic with auto-next when timer reaches 00:00:00
//   useEffect(() => {
//     if (formMeta.paginationType === "OnePagePerQuestion") {
//       const currentQuestion = questions[currentPage];
//       if (currentQuestion && currentQuestion.timer) {
//         const totalSeconds = parseTimeToSeconds(currentQuestion.timer);
//         setRemainingTime(totalSeconds);

//         const timerInterval = setInterval(() => {
//           setRemainingTime((prevTime) => {
//             if (prevTime <= 1) {
//               clearInterval(timerInterval);
//               // Automatically go to the next question if not the last one
//               if (currentPage < questions.length - 1) {
//                 handleNext();
//               }
//               return 0;
//             }
//             return prevTime - 1;
//           });
//         }, 1000);

//         return () => clearInterval(timerInterval);
//       }
//     }
//   }, [currentPage, questions, formMeta.paginationType, handleNext]);

//   const renderField = (question) => {
//     const commonProps = {
//       key: question.fieldId,
//       field: {
//         ...question,
//         translations: question.translations,
//         ...question.matrixData,
//       },
//       formData: formData,
//       handleChange: handleChange,
//       selectedLanguage: selectedLanguage,
//     };
//     return <FormField key={question.fieldId} {...commonProps} />;
//   };

//   AOS.init();
//   console.log("Questions: _needed_ones_", questions);

//   let content;

//   if (formMeta.paginationType === "OnePagePerQuestion") {
//     const currentQuestion = questions[currentPage];
//     const isLastQuestion = currentPage === questions.length - 1;
//     const isFirstQuestion = currentPage === 0;

//     content = (
//       <form
//         className="form-container"
//         onSubmit={handleSubmit}
//         data-aos="fade-right"
//       >
//         {currentQuestion && (
//           <div className="question-container">
//             <div>
//               <div className="question-title">
//                 {console.log(currentQuestion.label)}
//                 <div
//                   style={{
//                     borderRadius:
//                       currentQuestion.shape === "Circle" ? "50px" : "0px",
//                     backgroundColor: currentQuestion.back_ground_color,
//                     color: currentQuestion.font_color,
//                     padding: "2px 15px",
//                   }}
//                   dangerouslySetInnerHTML={{
//                     __html:
//                       currentQuestion.translations?.[selectedLanguage] ||
//                       currentQuestion.label,
//                   }}
//                 />
//                 <br />
//               </div>
//             </div>
//             {renderField(currentQuestion)}
//           </div>
//         )}
//         <div className="navigation-buttons" style={{ marginTop: "24px" }}>
//           {!isFirstQuestion && (
//             <button type="button" id="previous-btn" onClick={handlePrevious}>
//               Previous
//             </button>
//           )}
//           {!isLastQuestion ? (
//             <button type="button" id="next-button" onClick={handleNext}>
//               Next
//             </button>
//           ) : (
//             <button type="submit" className="submit-button" id="submit-btn">
//               Submit
//             </button>
//           )}
//         </div>
//         {currentQuestion.timer ? (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "flex-end",
//               marginTop: "150px",
//               justifyContent: "flex-end",
//             }}
//           >
//             <span
//               style={{
//                 position: "fixed",
//                 color: "black",
//                 borderRadius: "50%",
//                 display: "inline-block",
//                 width: "100px",
//                 height: "100px",
//                 backgroundColor: "rgba(255, 255, 255, 0.97)",
//                 textAlign: "center",
//                 lineHeight: "100px",
//                 fontSize: "24px",
//                 fontFamily: "Poppins",
//                 border: `10px solid ${currentQuestion.back_ground_color}`,
//               }}
//             >
//               {remainingTime !== null
//                 ? formatTime(remainingTime)
//                 : currentQuestion.timer}
//             </span>
//           </div>
//         ) : null}
//       </form>
//     );
//   } else if (formMeta.paginationType === "OnePageWithAllTheQuestions") {
//     content = (
//       <form
//         className="form-container"
//         onSubmit={handleSubmit}
//         style={{ marginBottom: "50px" }}
//         data-aos="fade-right"
//       >
//         {questions.map((question, index) => (
//           <div
//             key={question.id || index}
//             className="question-container"
//             data-aos="fade-right"
//           >
//             <div
//               style={{
//                 borderRadius: question.shape === "Circle" ? "50px" : "0px",
//                 backgroundColor: question.back_ground_color,
//                 color: question.font_color,
//                 padding: "2px 15px",
//               }}
//               dangerouslySetInnerHTML={{
//                 __html:
//                   question.translations?.[selectedLanguage] || question.label,
//               }}
//             />
//             <br />
//             {renderField(question)}
//           </div>
//         ))}
//         <div className="navigation-buttons" style={{ marginTop: "24px" }}>
//           <button type="submit" className="submit-button" id="submit-btn">
//             Submit
//           </button>
//         </div>
//       </form>
//     );
//   } else if (formMeta.paginationType === "OnePagePerSection") {
//     const currentSection = sections[currentPage];
//     const isLastSection = currentPage === sections.length - 1;
//     const isFirstSection = currentPage === 0;
//     content = (
//       <form
//         className="form-container"
//         onSubmit={handleSubmit}
//         data-aos="fade-right"
//       >
//         {currentSection.questions.map((question) => (
//           <div key={question.fieldId} className="question-container">
//             <div
//               style={{
//                 borderRadius: question.shape === "Circle" ? "50px" : "0px",
//                 backgroundColor: question.back_ground_color,
//                 color: question.font_color,
//                 padding: "2px 15px",
//               }}
//               dangerouslySetInnerHTML={{
//                 __html:
//                   question.translations?.[selectedLanguage] || question.label,
//               }}
//             />
//             <br />
//             {renderField(question)}
//           </div>
//         ))}
//         <div className="navigation-buttons" style={{ marginTop: "24px" }}>
//           {formMeta.isBackAllowed && !isFirstSection && (
//             <button type="button" id="previous-btn" onClick={handlePrevious}>
//               Previous
//             </button>
//           )}
//           {!isLastSection ? (
//             <button type="button" id="next-button" onClick={handleNext}>
//               Next
//             </button>
//           ) : (
//             <button type="submit" className="submit-button" id="submit-btn">
//               Submit
//             </button>
//           )}
//         </div>
//       </form>
//     );
//   }

//   const showProgressBar =
//     formMeta.paginationType === "OnePagePerQuestion" ||
//     formMeta.paginationType === "OnePagePerSection";

//   return (
//     <div style={{ position: "relative", marginBottom: "150px" }}>
//       {content}
//       {showProgressBar && (
//         <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
//           <QuestionProgress
//             currentQuestion={currentPage}
//             totalQuestions={
//               formMeta.paginationType === "OnePagePerQuestion"
//                 ? questions.length
//                 : sections.length
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormContent;

// import { useState, useEffect } from "react";
// import FormField from "../../../Components/Home/Form/FormField";
// import QuestionProgress from "../../../utils/Progressbar";
// import AOS from "aos";

// const FormContent = ({
//   formMeta,
//   questions,
//   sections,
//   currentPage,
//   handleChange,
//   handlePrevious,
//   handleNext,
//   handleSubmit,
//   formData,
//   selectedLanguage,
// }) => {
//   // Timer state
//   const [remainingTime, setRemainingTime] = useState(null);
//   const [isTimerEnded, setIsTimerEnded] = useState(false); // Track if the timer has ended

//   // Format time as HH:MM:SS
//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   // Parse time string (HH:MM:SS) to seconds
//   const parseTimeToSeconds = (timeString) => {
//     if (!timeString) return 0;

//     const parts = timeString.split(":");
//     if (parts.length === 3) {
//       const hours = parseInt(parts[0], 10);
//       const minutes = parseInt(parts[1], 10);
//       const seconds = parseInt(parts[2], 10);
//       return hours * 3600 + minutes * 60 + seconds;
//     }
//     return 0;
//   };

//   // Timer logic with auto-next when timer reaches 00:00:00
//   useEffect(() => {
//     if (formMeta.paginationType === "OnePagePerQuestion") {
//       const currentQuestion = questions[currentPage];
//       if (currentQuestion && currentQuestion.timer) {
//         const totalSeconds = parseTimeToSeconds(currentQuestion.timer);
//         setRemainingTime(totalSeconds);
//         setIsTimerEnded(false); // Reset timer ended state for the new question

//         const timerInterval = setInterval(() => {
//           setRemainingTime((prevTime) => {
//             if (prevTime <= 1) {
//               clearInterval(timerInterval);
//               // Automatically go to the next question if not the last one
//               if (currentPage < questions.length - 1 && !isTimerEnded) {
//                 setIsTimerEnded(true); // Mark timer as ended
//                 handleNext();
//               }
//               return 0;
//             }
//             return prevTime - 1;
//           });
//         }, 1000);

//         return () => clearInterval(timerInterval);
//       }
//     }
//   }, [
//     currentPage,
//     questions,
//     formMeta.paginationType,
//     handleNext,
//     isTimerEnded,
//   ]);

//   const renderField = (question) => {
//     const commonProps = {
//       key: question.fieldId,
//       field: {
//         ...question,
//         translations: question.translations,
//         ...question.matrixData,
//       },
//       formData: formData,
//       handleChange: handleChange,
//       selectedLanguage: selectedLanguage,
//     };
//     return <FormField key={question.fieldId} {...commonProps} />;
//   };

//   AOS.init();
//   console.log("Questions: _needed_ones_", questions);

//   let content;

//   if (formMeta.paginationType === "OnePagePerQuestion") {
//     const currentQuestion = questions[currentPage];
//     const isLastQuestion = currentPage === questions.length - 1;
//     const isFirstQuestion = currentPage === 0;

//     content = (
//       <form
//         className="form-container"
//         onSubmit={handleSubmit}
//         data-aos="fade-right"
//       >
//         {currentQuestion && (
//           <div className="question-container">
//             <div>
//               <div className="question-title">
//                 {console.log(currentQuestion.label)}
//                 <div
//                   style={{
//                     borderRadius:
//                       currentQuestion.shape === "Circle" ? "50px" : "0px",
//                     backgroundColor: currentQuestion.back_ground_color,
//                     color: currentQuestion.font_color,
//                     padding: "2px 15px",
//                   }}
//                   dangerouslySetInnerHTML={{
//                     __html:
//                       currentQuestion.translations?.[selectedLanguage] ||
//                       currentQuestion.label,
//                   }}
//                 />
//                 <br />
//               </div>
//             </div>
//             {renderField(currentQuestion)}
//           </div>
//         )}
//         <div className="navigation-buttons" style={{ marginTop: "24px" }}>
//           {!isFirstQuestion && (
//             <button type="button" id="previous-btn" onClick={handlePrevious}>
//               Previous
//             </button>
//           )}
//           {!isLastQuestion ? (
//             <button type="button" id="next-button" onClick={handleNext}>
//               Next
//             </button>
//           ) : (
//             <button type="submit" className="submit-button" id="submit-btn">
//               Submit
//             </button>
//           )}
//         </div>
//         {currentQuestion.timer ? (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "flex-end",
//               marginTop: "150px",
//               justifyContent: "flex-end",
//             }}
//           >
//             <span
//               style={{
//                 position: "fixed",
//                 color: "black",
//                 borderRadius: "50%",
//                 display: "inline-block",
//                 width: "100px",
//                 height: "100px",
//                 backgroundColor: "rgba(255, 255, 255, 0.97)",
//                 textAlign: "center",
//                 lineHeight: "100px",
//                 fontSize: "24px",
//                 fontFamily: "Poppins",
//                 border: `10px solid ${currentQuestion.back_ground_color}`,
//               }}
//             >
//               {remainingTime !== null
//                 ? formatTime(remainingTime)
//                 : currentQuestion.timer}
//             </span>
//           </div>
//         ) : null}
//       </form>
//     );
//   } else if (formMeta.paginationType === "OnePageWithAllTheQuestions") {
//     content = (
//       <form
//         className="form-container"
//         onSubmit={handleSubmit}
//         style={{ marginBottom: "50px" }}
//         data-aos="fade-right"
//       >
//         {questions.map((question, index) => (
//           <div
//             key={question.id || index}
//             className="question-container"
//             data-aos="fade-right"
//           >
//             <div
//               style={{
//                 borderRadius: question.shape === "Circle" ? "50px" : "0px",
//                 backgroundColor: question.back_ground_color,
//                 color: question.font_color,
//                 padding: "2px 15px",
//               }}
//               dangerouslySetInnerHTML={{
//                 __html:
//                   question.translations?.[selectedLanguage] || question.label,
//               }}
//             />
//             <br />
//             {renderField(question)}
//           </div>
//         ))}
//         <div className="navigation-buttons" style={{ marginTop: "24px" }}>
//           <button type="submit" className="submit-button" id="submit-btn">
//             Submit
//           </button>
//         </div>
//       </form>
//     );
//   } else if (formMeta.paginationType === "OnePagePerSection") {
//     const currentSection = sections[currentPage];
//     const isLastSection = currentPage === sections.length - 1;
//     const isFirstSection = currentPage === 0;
//     content = (
//       <form
//         className="form-container"
//         onSubmit={handleSubmit}
//         data-aos="fade-right"
//       >
//         {currentSection.questions.map((question) => (
//           <div key={question.fieldId} className="question-container">
//             <div
//               style={{
//                 borderRadius: question.shape === "Circle" ? "50px" : "0px",
//                 backgroundColor: question.back_ground_color,
//                 color: question.font_color,
//                 padding: "2px 15px",
//               }}
//               dangerouslySetInnerHTML={{
//                 __html:
//                   question.translations?.[selectedLanguage] || question.label,
//               }}
//             />
//             <br />
//             {renderField(question)}
//           </div>
//         ))}
//         <div className="navigation-buttons" style={{ marginTop: "24px" }}>
//           {formMeta.isBackAllowed && !isFirstSection && (
//             <button type="button" id="previous-btn" onClick={handlePrevious}>
//               Previous
//             </button>
//           )}
//           {!isLastSection ? (
//             <button type="button" id="next-button" onClick={handleNext}>
//               Next
//             </button>
//           ) : (
//             <button type="submit" className="submit-button" id="submit-btn">
//               Submit
//             </button>
//           )}
//         </div>
//       </form>
//     );
//   }

//   const showProgressBar =
//     formMeta.paginationType === "OnePagePerQuestion" ||
//     formMeta.paginationType === "OnePagePerSection";

//   return (
//     <div style={{ position: "relative", marginBottom: "150px" }}>
//       {content}
//       {showProgressBar && (
//         <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
//           <QuestionProgress
//             currentQuestion={currentPage}
//             totalQuestions={
//               formMeta.paginationType === "OnePagePerQuestion"
//                 ? questions.length
//                 : sections.length
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormContent;

import { useState, useEffect, useRef } from "react";
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
  // Timer state
  const [remainingTime, setRemainingTime] = useState(null);
  const timerIntervalRef = useRef(null); // Use ref to keep track of the interval
  const timerEndedRef = useRef(false); // Use ref to track if timer has ended

  // Format time as HH:MM:SS
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Parse time string (HH:MM:SS) to seconds
  const parseTimeToSeconds = (timeString) => {
    if (!timeString) return 0;

    const parts = timeString.split(":");
    if (parts.length === 3) {
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      return hours * 3600 + minutes * 60 + seconds;
    }
    return 0;
  };

  // Custom handleChange wrapper to prevent timer reset during input
  const handleFieldChange = (fieldId, value) => {
    // Only update the form data without affecting the timer
    handleChange(fieldId, value);
  };

  // Timer logic with auto-next when timer reaches 00:00:00
  useEffect(() => {
    // Clear any existing interval
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    // Reset timer ended flag when page changes
    timerEndedRef.current = false;

    if (formMeta.paginationType === "OnePagePerQuestion") {
      const currentQuestion = questions[currentPage];
      if (currentQuestion && currentQuestion.timer) {
        const totalSeconds = parseTimeToSeconds(currentQuestion.timer);
        setRemainingTime(totalSeconds);

        timerIntervalRef.current = setInterval(() => {
          setRemainingTime((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(timerIntervalRef.current);
              timerIntervalRef.current = null;

              // Use ref to ensure handleNext is only called once
              if (
                currentPage < questions.length - 1 &&
                !timerEndedRef.current
              ) {
                timerEndedRef.current = true;
                handleNext();
              }
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      }
    }

    // Cleanup function to clear the interval when component unmounts or dependencies change
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [currentPage, questions, formMeta.paginationType, handleNext]);

  const renderField = (question) => {
    const commonProps = {
      key: question.fieldId,
      field: {
        ...question,
        translations: question.translations,
        ...question.matrixData,
      },
      formData: formData,
      handleChange: handleFieldChange, // Use our custom wrapper
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
      <form
        className="form-container"
        onSubmit={handleSubmit}
        data-aos="fade-right"
      >
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
        {currentQuestion?.timer ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              marginTop: "150px",
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
