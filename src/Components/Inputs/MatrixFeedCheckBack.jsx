import "../../styles/RadioFeedBack.css";
import React from "react";

const MatrixFeedCheckbackField = ({
  field,
  formData,
  setFormData,
  selectedLanguage,
}) => {
  const handleChange = (rowId, columnId) => {
    setFormData((prev) => ({
      ...prev,
      [field.fieldId]: {
        ...prev[field.fieldId],
        [rowId]: columnId,
      },
    }));
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
                      type="checkbox"
                      name={`${field.fieldId}-${row.id}`}
                      value={column.id}
                      checked={formData[field.fieldId]?.[row.id] === column.id}
                      onChange={() => handleChange(row.id, column.id)}
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

export default MatrixFeedCheckbackField;
