const Radio = ({ field, formData, handleChange, selectedLanguage }) => {
  // const jsonResponse = field.translations?.[selectedLanguage] || field.label;

  return (
    <div key={field.index}>
      <div
      // dangerouslySetInnerHTML={{
      //   __html: jsonResponse,
      // }}
      />
      <div className="radio-group2">
        {field.options.map((option) => {
          const isSingleCharacter =
            option.translations?.[selectedLanguage]?.length === 1 ||
            option.label.length === 1;

          return (
            <div key={option.value} className="radio-item2">
              <input
                type="radio"
                id={`${field.fieldId}-${option.value}`}
                name={field.fieldId}
                value={option.value}
                checked={formData[field.fieldId] === option.value}
                onChange={() => handleChange(field.fieldId, option.value)}
                style={{
                  display: "none",
                }}
              />
              <label
                style={{
                  color:
                    formData[field.fieldId] === option.value
                      ? "white"
                      : "black",
                  cursor: "pointer",
                  backgroundColor:
                    formData[field.fieldId] === option.value
                      ? "rgb(8, 8, 8)"
                      : "rgb(222, 251, 205)",
                  borderRadius: isSingleCharacter ? "50%" : "50px",
                  padding: isSingleCharacter ? "10px 18px" : "10px 18px",
                }}
                htmlFor={`${field.fieldId}-${option.value}`}
                title={option.translations?.[selectedLanguage] || option.label}
              >
                {option.translations?.[selectedLanguage] || option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Radio;

// import   { useState } from "react";

// const Radio = ({ field, formData, handleChange, selectedLanguage }) => {
//   const [activeTooltip, setActiveTooltip] = useState(null);

//   return (
//     <div key={field.index}>
//       <div className="radio-group2">
//         {field.options.map((option) => {
//           const isSingleCharacter =
//             option.translations?.[selectedLanguage]?.length === 1 ||
//             option.label.length === 1;

//           const displayText =
//             option.translations?.[selectedLanguage] || option.label;
//           const tooltipText = option.tooltip || displayText;

//           return (
//             <div
//               key={option.value}
//               className="radio-item2"
//               style={{
//                 position: "relative",
//                 display: "inline-block",
//                 margin: "4px",
//               }}
//             >
//               <input
//                 type="radio"
//                 id={`${field.fieldId}-${option.value}`}
//                 name={field.fieldId}
//                 value={option.value}
//                 checked={formData[field.fieldId] === option.value}
//                 onChange={() => handleChange(field.fieldId, option.value)}
//                 style={{
//                   display: "none",
//                 }}
//               />
//               <label
//                 style={{
//                   color:
//                     formData[field.fieldId] === option.value
//                       ? "white"
//                       : "black",
//                   cursor: "pointer",
//                   backgroundColor:
//                     formData[field.fieldId] === option.value
//                       ? "rgb(8, 8, 8)"
//                       : "rgb(222, 251, 205)",
//                   borderRadius: isSingleCharacter ? "50%" : "50px",
//                   padding: isSingleCharacter ? "10px 18px" : "10px 18px",
//                   display: "inline-block",
//                   position: "relative",
//                 }}
//                 htmlFor={`${field.fieldId}-${option.value}`}
//                 title={option.translations?.[selectedLanguage] || option.label}
//                 onMouseEnter={() => setActiveTooltip(option.value)}
//                 onMouseLeave={() => setActiveTooltip(null)}
//               >
//                 {displayText}
//               </label>

//               {activeTooltip === option.value && tooltipText && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     bottom: "100%",
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     marginBottom: "8px",
//                     padding: "6px 12px",
//                     backgroundColor: "rgba(0, 0, 0, 0.8)",
//                     color: "white",
//                     borderRadius: "4px",
//                     fontSize: "14px",
//                     whiteSpace: "nowrap",
//                     zIndex: 1000,
//                     boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//                   }}
//                 >
//                   {tooltipText}
//                   <div
//                     style={{
//                       position: "absolute",
//                       left: "50%",
//                       transform: "translateX(-50%)",
//                       top: "100%",
//                       width: 0,
//                       height: 0,
//                       borderLeft: "6px solid transparent",
//                       borderRight: "6px solid transparent",
//                       borderTop: "6px solid rgba(0, 0, 0, 0.8)",
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Radio;
