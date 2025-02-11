const FormHeader = ({ formMeta, selectedLanguage, setSelectedLanguage }) => {
  return (
    <div className="form-container">
      <h2 className="form-title" data-aos="fade-right">
        {formMeta.formName}
      </h2>
      {formMeta.survey_languages?.length > 0 && (
        <select
          className="language-selector-combo"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {formMeta.survey_languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FormHeader;
