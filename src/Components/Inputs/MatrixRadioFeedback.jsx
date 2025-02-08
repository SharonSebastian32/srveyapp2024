// import "../../styles/RadioFeedBack.css";
// import React from "react";

// const MatrixRadioFeedback = ({
//   field,
//   formData,
//   setFormData,
//   selectedLanguage,
// }) => {
//   return (
//     <table className="matrix-table">
//       <thead className="matrix-thead">
//         <tr>
//           <th className="matrix-header-empty"></th>
//           {field.columns.map((column, colIndex) => (
//             <th
//               key={column.id}
//               className="matrix-header"
//               style={
//                 colIndex === field.columns.length - 1
//                   ? {
//                       borderTopRightRadius: "50px",
//                       backgroundColor: "#d6d6d6",
//                     }
//                   : { backgroundColor: "#d6d6d6" }
//               }
//             >
//               {column.translations?.[selectedLanguage] || column.label}
//             </th>
//           ))}
//         </tr>
//       </thead>

//       <tbody className="matrix-tbody">
//         {field.rows.map((row, rowIndex) => (
//           <React.Fragment key={row.id}>
//             <tr className="matrix-label-row">
//               <td
//                 colSpan={field.columns.length + 1}
//                 className="matrix-label"
//                 style={{ border: "none", padding: "0px" }}
//               >
//                 {field.rows[rowIndex].translations?.[selectedLanguage] ||
//                   field.rows[rowIndex].label}
//               </td>
//             </tr>

//             <tr
//               className="matrix-row"
//               style={{
//                 alignItems: "center",
//               }}
//             >
//               <td
//                 className="matrix-cell matrix-cell-label"
//                 style={{
//                   borderTopLeftRadius: "50px",
//                   backgroundColor: "#d3f8d2",
//                 }}
//               >
//                 {row.translations?.[selectedLanguage] || row.label}
//               </td>

//               {field.columns.map((column, colIndex) => (
//                 <td key={column.id} className="matrix-cell">
//                   <div className="radio-group">
//                     <input
//                       type="radio"
//                       name={`${field.fieldId}-${row.id}`}
//                       value={column.id}
//                       checked={formData[field.fieldId]?.[row.id] === column.id}
//                       onChange={() => {
//                         setFormData((prev) => ({
//                           ...prev,
//                           [field.fieldId]: {
//                             ...prev[field.fieldId],
//                             [row.id]: column.id,
//                           },
//                         }));
//                       }}
//                       required={field.required}
//                     />
//                   </div>
//                 </td>
//               ))}
//             </tr>
//           </React.Fragment>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default MatrixRadioFeedback;

import "../../styles/RadioFeedBack.css";
import React from "react";

const MatrixRadioFeedback = ({
  field,
  formData,
  handleChange,
  selectedLanguage,
}) => {
  const handleRadioChange = (rowId, columnId) => {
    handleChange(field.fieldId, {
      ...formData[field.fieldId],
      [rowId]: columnId,
    });
  };

  return (
    <table className="matrix-table">
      <thead className="matrix-thead">
        <tr>
          <th className="matrix-header-empty"></th>
          {field.columns.map((column, colIndex) => (
            <th
              key={column.id}
              className="matrix-header"
              style={
                colIndex === field.columns.length - 1
                  ? {
                      borderTopRightRadius: "50px",
                      backgroundColor: "#d6d6d6",
                    }
                  : { backgroundColor: "#d6d6d6" }
              }
            >
              {column.translations?.[selectedLanguage] || column.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="matrix-tbody">
        {field.rows.map((row, rowIndex) => (
          <React.Fragment key={row.id}>
            <tr className="matrix-label-row">
              <td
                colSpan={field.columns.length + 1}
                className="matrix-label"
                style={{ border: "none", padding: "0px" }}
              >
                {row.translations?.[selectedLanguage] || row.label}
              </td>
            </tr>

            <tr
              className="matrix-row"
              style={{
                alignItems: "center",
              }}
            >
              <td
                className="matrix-cell matrix-cell-label"
                style={{
                  borderTopLeftRadius: "50px",
                  backgroundColor: "#d3f8d2",
                }}
              >
                {row.translations?.[selectedLanguage] || row.label}
              </td>

              {field.columns.map((column) => (
                <td key={column.id} className="matrix-cell">
                  <div className="radio-group">
                    <input
                      type="radio"
                      name={`${field.fieldId}-${row.id}`}
                      value={column.id}
                      checked={formData[field.fieldId]?.[row.id] === column.id}
                      onChange={() => handleRadioChange(row.id, column.id)}
                      required={field.required}
                    />
                  </div>
                </td>
              ))}
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default MatrixRadioFeedback;
