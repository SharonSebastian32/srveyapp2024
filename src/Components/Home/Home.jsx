import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../../api/UseAxiosService";
import Banner from "./Banner/Banner";
import AOS from "aos";
import "../../styles/Loader.css";
import ListContainer from "./List/List";

function Home() {
  const navigate = useNavigate();
  const [initialFields, setInitialFields] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        const listData = fetchedData.data.results.map((obj) => ({
          english_title: obj.english_title,
          formId: obj.id,
          color: obj.color,
          survey_time_limit: obj.survey_time_limit,
          background_color: obj.background_color,
        }));
        setInitialFields(listData);
        console.log("Survey List :: ", listData);
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
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Banner />
      <ListContainer
        initialFields={initialFields}
        handleFormNavigation={handleFormNavigation}
      />
    </div>
  );
}

export default Home;
