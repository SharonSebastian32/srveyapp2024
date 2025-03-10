const FormHeader = ({ formMeta, selectedLanguage, setSelectedLanguage }) => {
  return (
    <div className="form-container">
      <br />
      {formMeta.survey_languages?.length > 0 && (
        <div className="custom-select">
          <select
            className="language-selector-combo"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            {formMeta.survey_languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default FormHeader;
