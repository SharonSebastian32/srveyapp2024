const MatrixRadioFeedback = ({
  field,
  formData,
  setFormData,
  selectedLanguage,
}) => {
  return (
    <div className="matrix-container">
      <div className="matrix-row">
        <div
          className="matrix-cell"
          id="metr-cell"
          style={{
            borderBottomLeftRadius: "50px",
            borderTopLeftRadius: "50px",
            backgroundColor: "#d6d6d6",
          }}
        ></div>

        {field.columns.map((column, colIndex) => (
          <div
            className="matrix-cell"
            key={column.id}
            style={
              colIndex === field.columns.length - 1
                ? {
                    borderTopRightRadius: "50px",
                    borderBottomRightRadius: "50px",
                    backgroundColor: "#d6d6d6",
                  }
                : {
                    backgroundColor: "#d6d6d6",
                  }
            }
          >
            {column.translations?.[selectedLanguage] || column.label}
          </div>
        ))}
      </div>

      {field.rows.map((row) => (
        <>
          <p className="pholder">
            {row.translations?.[selectedLanguage] || row.label}{" "}
          </p>

          <div className="matrix-row" key={row.id}>
            <div
              className="matrix-cell"
              style={{
                borderBottomLeftRadius: "50px",
                borderTopLeftRadius: "50px",
              }}
            >
              <p> {row.translations?.[selectedLanguage] || row.label} </p>
            </div>

            {field.columns.map((column, colIndex) => (
              <div
                className="matrix-cell"
                key={column.id}
                style={
                  colIndex === field.columns.length - 1
                    ? {
                        borderTopRightRadius: "50px",
                        borderBottomRightRadius: "50px",
                      }
                    : {}
                }
              >
                <div className="radio-group" style={{ marginTop: "25px" }}>
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
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default MatrixRadioFeedback;
