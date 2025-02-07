function ListContainer({ initialFields, handleFormNavigation }) {
  return (
    <div className="list-container">
      {initialFields.length > 0 ? (
        initialFields.map((obj, index) => (
          <div className="list" key={index} data-aos="fade-up">
            <p id="list-title">{obj.english_title}</p>
            <button
              className="submit-btn"
              style={{ backgroundColor: obj.color }}
              onClick={() => handleFormNavigation(obj.formId)}
            >
              Submit
            </button>
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
        >
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default ListContainer;
