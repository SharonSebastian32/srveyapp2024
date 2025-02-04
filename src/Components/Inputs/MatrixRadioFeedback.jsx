import "../../styles/RadioFeedBack.css";
import React from "react";
const MatrixRadioFeedback = ({
  field,
  formData,
  setFormData,
  selectedLanguage,
}) => {
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
            <tr key={row.id} className="matrix-row">
              <td
                className="matrix-cell matrix-cell-label"
                style={{
                  borderTopLeftRadius: "50px",
                  backgroundColor: "#d6d6d6",
                }}
              >
                {row.translations?.[selectedLanguage] || row.label}
              </td>

              {field.columns.map((column, colIndex) => (
                <td
                  key={column.id}
                  className="matrix-cell"
                  style={
                    colIndex === field.columns.length - 1
                      ? { borderTopRightRadius: "50px" }
                      : {}
                  }
                >
                  <div className="radio-group">
                    <input
                      type="radio"
                      name={`${field.fieldId}-${row.id}`}
                      value={column.id}
                      checked={formData[field.fieldId]?.[row.id] === column.id}
                      onChange={() => {
                        setFormData((prev) => ({
                          ...prev,
                          [field.fieldId]: {
                            ...prev[field.fieldId],
                            [row.id]: column.id,
                          },
                        }));
                      }}
                      required={field.required}
                    />
                  </div>
                </td>
              ))}
            </tr>

            {/* Insert a label between rows */}
            {rowIndex !== field.rows.length - 1 && (
              <tr className="matrix-label-row">
                <td colSpan={field.columns.length + 1} className="matrix-label" style={{
                  border:"none"
                }}>
                  <span>Hello</span>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default MatrixRadioFeedback;
