import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchData } from "../../Api/AxiosInstance";
import Banner from "../../../src/Components/Home/Banner/Banner";
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
        }));
        setInitialFields(listData);
      } catch (error) {
        console.error("Error fetching data in App:", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  return (
    <div className="container">
      <Banner />

      <div className="list-container">
        {initialFields.length > 0 &&
          initialFields.map((obj, index) => (
            <div className="list" key={index} data-aos="fade-up">
              <p>{obj.formId}</p>
              {/* <p>{obj.english_title}</p> */}
              <button
                className="submit-btn"
                style={{ backgroundColor: obj.color }}
                onClick={() => navigate(`/form/${obj.formId}`)}
              >
                Submit
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
