import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../../Api/AxiosApiInstance";
import Banner from "./Banner/Banner";
import AOS from "aos";
import "../../styles/Loader.css";
function Home() {
  const navigate = useNavigate();
  const [initialFields, setInitialFields] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        console.log(fetchedData.data.results);
        const listData = fetchedData.data.results.map((obj) => ({
          english_title: obj.english_title,
          formId: obj.id,
          color: obj.color,
        }));
        setInitialFields(listData);
      } catch (error) {
        console.error("Error fetching data in Home:", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, [data]);

  const handleFormNavigation = async (formId) => {
    try {
      navigate(`/form/${formId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Banner />
      <div className="list-container">
        {initialFields.length > 0 ? (
          initialFields.map((obj, index) => (
            <div className="list" key={index} data-aos="fade-up">
              <p>{obj.english_title}</p>
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
    </div>
  );
}

export default Home;
