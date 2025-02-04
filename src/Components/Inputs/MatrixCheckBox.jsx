const EmailField = ({ field, formData, handleChange, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

  return (
    <div className="matrix-checkbox">
      <table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th></th>
            {field.columns.map((column) => (
              <th key={column.id} style={{ textAlign: "center" }}>
                {column.translations?.[selectedLanguage] || column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {field.rows.map((row) => (
            <tr key={row.id} style={{ textAlign: "center" }}>
              <td style={{ backgroundColor: "#f8f8f8" }}>
                {row.translations?.[selectedLanguage] || row.label}
              </td>
              {field.columns.map((column, colIndex) => (
                <td
                  key={column.id}
                  style={
                    colIndex === field.columns.length - 1
                      ? {
                          borderTopRightRadius: "20px",
                          borderBottomRightRadius: "20px",
                        }
                      : {}
                  }
                >
                  <input
                    type="checkbox"
                    name={`${field.fieldId}-${row.id}`}
                    value={column.id}
                    checked={formData[field.fieldId]?.[row.id]?.includes(
                      column.id
                    )}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...formData[field.fieldId]?.[row.id], column.id]
                        : formData[field.fieldId]?.[row.id]?.filter(
                            (value) => value !== column.id
                          );
                      setFormData((prev) => ({
                        ...prev,
                        [field.fieldId]: {
                          ...prev[field.fieldId],
                          [row.id]: newValues,
                        },
                      }));
                    }}
                    required={field.required}
                    style={{ display: "block", margin: "0 auto" }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailField;
