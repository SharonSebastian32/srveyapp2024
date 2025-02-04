import React from "react";

const MatrixRadioFeedback = ({
  field,
  formData,
  setFormData,
  selectedLanguage,
}) => {
  const handleRadioChange = (rowId, columnId) => {
    setFormData((prev) => ({
      ...prev,
      [field.fieldId]: {
        ...prev[field.fieldId],
        [rowId]: columnId,
      },
    }));
  };

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
            style={{
              backgroundColor: "#d6d6d6",
              ...(colIndex === field.columns.length - 1
                ? {
                    borderTopRightRadius: "50px",
                    borderBottomRightRadius: "50px",
                  }
                : {}),
            }}
          >
            {column.translations?.[selectedLanguage] || column.label}
          </div>
        ))}
      </div>

      {field.rows.map((row) => (
        <React.Fragment key={row.id}>
          <p className="pholder">
            {row.translations?.[selectedLanguage] || row.label}
          </p>

          <div className="matrix-row">
            <div
              className="matrix-cell"
              style={{
                borderBottomLeftRadius: "50px",
                borderTopLeftRadius: "50px",
              }}
            >
              <p>{row.translations?.[selectedLanguage] || row.label}</p>
            </div>

            {field.columns.map((column, colIndex) => (
              <div
                className="matrix-cell"
                key={column.id}
                style={{
                  ...(colIndex === field.columns.length - 1
                    ? {
                        borderTopRightRadius: "50px",
                        borderBottomRightRadius: "50px",
                      }
                    : {}),
                }}
              >
                <div className="radio-group" style={{ marginTop: "25px" }}>
                  <input
                    type="radio"
                    name={`${field.fieldId}-${row.id}`}
                    value={column.id}
                    checked={formData[field.fieldId]?.[row.id] === column.id}
                    onChange={() => handleRadioChange(row.id, column.id)}
                    required={field.required}
                  />
                </div>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MatrixRadioFeedback;
