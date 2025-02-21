// const CheckBox = ({ field, formData, handleChange, selectedLanguage }) => {
//   const onCheckboxChange = (optionValue) => {
//     const currentSelections = formData[field.fieldId] || [];
//     const newSelections = currentSelections.includes(optionValue)
//       ? currentSelections.filter((value) => value !== optionValue)
//       : [...currentSelections, optionValue];

//     handleChange(field.fieldId, newSelections);
//   };

//   return (
//     <div className="checkbox-group">
//       {field.options.map((option) => (
//         <div
//           key={option.value}
//           id="checkbox-input-div"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             flexWrap: "wrap",
//             borderRadius: "10px",
//             margin: "10px",
//             border: "1px solid #ccc",
//             paddingLeft: "10px",
//             paddingRight: "50px",
//           }}
//         >
//           <input
//             style={{
//               verticalAlign: "middle",
//               position: "relative",
//               bottom: "1px",
//             }}
//             type="checkbox"
//             id={`${field.fieldId}-${option.value}`}
//             name={field.fieldId}
//             value={option.value}
//             checked={formData[field.fieldId]?.includes(option.value)}
//             onChange={() => onCheckboxChange(option.value)}
//           />
//           <label
//             htmlFor={`${field.fieldId}-${option.value}`}
//             style={{ paddingTop: ".58em" }}
//           >
//             {option.translations?.[selectedLanguage] || option.label}
//             <img
//               src={option.image}
//               alt=""
//               style={{
//                 width: "250px",
//                 height: "200px",
//                 objectFit: "cover",
//               }}
//             />
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CheckBox;

// const CheckBox = ({ field, formData, handleChange, selectedLanguage }) => {
//   const onCheckboxChange = (optionValue) => {
//     const currentSelections = formData[field.fieldId] || [];
//     const newSelections = currentSelections.includes(optionValue)
//       ? currentSelections.filter((value) => value !== optionValue)
//       : [...currentSelections, optionValue];

//     handleChange(field.fieldId, newSelections);
//   };

//   return (
//     <div className="checkbox-group">
//       {field.options.map((option) => (
//         <div
//           key={option.value}
//           id="checkbox-input-div"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             flexWrap: "wrap",
//             borderRadius: "10px",
//             margin: "10px",
//             border: "1px solid #ccc",
//             paddingLeft: "10px",
//             paddingRight: "50px",
//           }}
//         >
//           <input
//             type="checkbox"
//             id={`${field.fieldId}-${option.value}`}
//             name={field.fieldId}
//             value={option.value}
//             checked={formData[field.fieldId]?.includes(option.value)}
//             onChange={() => onCheckboxChange(option.value)}
//             style={{
//               verticalAlign: "middle",
//               position: "relative",
//               bottom: "1px",
//             }}
//           />
//           <label
//             htmlFor={`${field.fieldId}-${option.value}`}
//             style={{ paddingTop: "0.58em" }}
//           >
//             {option.translations?.[selectedLanguage] || option.label}
//             <img
//               src={option.image}
//               alt=""
//               style={{
//                 width: "250px",
//                 height: "200px",
//                 objectFit: "cover",
//               }}
//             />
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CheckBox;

// const CheckBox = ({ field, formData, handleChange, selectedLanguage }) => {
//   const onCheckboxChange = (optionValue) => {
//     const currentSelections = formData[field.fieldId] || [];
//     const newSelections = currentSelections.includes(optionValue)
//       ? currentSelections.filter((value) => value !== optionValue)
//       : [...currentSelections, optionValue];

//     handleChange(field.fieldId, newSelections);
//   };

//   return (
//     <div className="checkbox-group">
//       {field.options.map((option) => (
//         <div
//           key={option.value}
//           id="checkbox-input-div"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             flexWrap: "wrap",
//             borderRadius: "10px",
//             margin: "10px",
//             border: "1px solid #ccc",
//             paddingLeft: "10px",
//             paddingRight: "50px",
//           }}
//         >
//           <input
//             type="checkbox"
//             id={`${field.fieldId}-${option.value}`}
//             name={field.fieldId}
//             value={option.value}
//             checked={formData[field.fieldId]?.includes(option.value)}
//             onChange={() => onCheckboxChange(option.value)}
//             style={{
//               verticalAlign: "middle",
//               position: "relative",
//               bottom: "1px",
//             }}
//           />
//           <label
//             htmlFor={`${field.fieldId}-${option.value}`}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               paddingBottom: "4em",
//             }}
//           >
//             <img
//               src={option.image}
//               alt=""
//               style={{
//                 width: "250px",
//                 height: "200px",
//                 objectFit: "cover",
//               }}
//             />
//             <span>
//               {option.translations?.[selectedLanguage] || option.label}
//             </span>
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CheckBox;

// const CheckBox = ({ field, formData, handleChange, selectedLanguage }) => {
//   const onCheckboxChange = (optionValue) => {
//     const currentSelections = formData[field.fieldId] || [];
//     const newSelections = currentSelections.includes(optionValue)
//       ? currentSelections.filter((value) => value !== optionValue)
//       : [...currentSelections, optionValue];

//     handleChange(field.fieldId, newSelections);
//   };

//   return (
//     <div className="checkbox-group">
//       {field.options.map((option) => (
//         <div
//           key={option.value}
//           id="checkbox-input-div"
//           style={{
//             position: "relative", // Added to position the checkbox relative to this container
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             flexWrap: "wrap",
//             borderRadius: "10px",
//             margin: "10px",
//             border: "1px solid #ccc",
//             padding: "10px", // Unified padding for simplicity
//           }}
//         >
//           <label
//             htmlFor={`${field.fieldId}-${option.value}`}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               paddingTop: "0.58em",
//             }}
//           >
//             <img
//               src={option.image}
//               alt=""
//               style={{
//                 width: "250px",
//                 height: "200px",
//                 objectFit: "cover",
//               }}
//             />
//             <span>
//               {option.translations?.[selectedLanguage] || option.label}
//             </span>
//           </label>
//           <input
//             type="checkbox"
//             id={`${field.fieldId}-${option.value}`}
//             name={field.fieldId}
//             value={option.value}
//             checked={formData[field.fieldId]?.includes(option.value)}
//             onChange={() => onCheckboxChange(option.value)}
//             style={{
//               position: "absolute",
//               bottom: "10px", // Position at bottom
//               right: "10px", // Position at right
//             }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CheckBox;

const CheckBox = ({ field, formData, handleChange, selectedLanguage }) => {
  const onCheckboxChange = (optionValue) => {
    const currentSelections = formData[field.fieldId] || [];
    const newSelections = currentSelections.includes(optionValue)
      ? currentSelections.filter((value) => value !== optionValue)
      : [...currentSelections, optionValue];

    handleChange(field.fieldId, newSelections);
  };

  return (
    <div className="checkbox-group">
      {field.options.map((option) => (
        <div
          key={option.value}
          id="checkbox-input-div"
          style={{
            position: "relative", // Reference for absolute positioning
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexWrap: "wrap",
            borderRadius: "10px",
            margin: "10px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <label
            htmlFor={`${field.fieldId}-${option.value}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "0.58em",
            }}
          >
            <img
              src={option.image}
              alt=""
              style={{
                width: "150px",
                height: "160px",
                objectFit: "cover",
              }}
            />
            <span>
              {option.translations?.[selectedLanguage] || option.label}
            </span>
          </label>
          <input
            type="checkbox"
            id={`${field.fieldId}-${option.value}`}
            name={field.fieldId}
            value={option.value}
            checked={formData[field.fieldId]?.includes(option.value)}
            onChange={() => onCheckboxChange(option.value)}
            style={{
              position: "absolute",
              top: "10px", // Position at top
              right: "10px", // Position at right
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
