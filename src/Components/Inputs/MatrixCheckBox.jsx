const MatrixCheckBox = ({ field, formData, setFormData, selectedLanguage }) => {
  const placeholder =
    field.translationsPlaceholder?.[selectedLanguage] || field.placeholder;

  const onCheckboxChange = (rowId, columnId) => {
    const newValues = formData[field.fieldId]?.[rowId]?.includes(columnId)
      ? formData[field.fieldId]?.[rowId]?.filter((value) => value !== columnId)
      : [...formData[field.fieldId]?.[rowId], columnId];
    setFormData((prev) => ({
      ...prev,
      [field.fieldId]: {
        ...prev[field.fieldId],
        [rowId]: newValues,
      },
    }));
  };

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
                    onChange={() => onCheckboxChange(row.id, column.id)}
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

export default MatrixCheckBox;
