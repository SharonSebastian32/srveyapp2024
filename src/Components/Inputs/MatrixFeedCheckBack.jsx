import "../../styles/RadioFeedBack.css";

const MatrixFeedCheckbackField = ({
  field,
  formData,
  setFormData,
  selectedLanguage,
}) => {
  return (
    <table className="matrix-table">
      <thead className="matrix-thead">
        <tr>
          <th id="matrix-header-empty" className="matrix-header-empty"></th>

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
                {field.rows[rowIndex].translations?.[selectedLanguage] ||
                  field.rows[rowIndex].label}
              </td>
            </tr>

            <tr className="matrix-row">
              <td
                className="matrix-cell matrix-cell-label"
                style={{
                  borderTopLeftRadius: "50px",
                  backgroundColor: "#d3f8d2",
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
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default MatrixFeedCheckbackField;
