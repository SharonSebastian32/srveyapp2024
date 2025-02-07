import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../../Api/AxiosApiInstance";
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
      <ListContainer
        initialFields={initialFields}
        handleFormNavigation={handleFormNavigation}
      />
    </div>
  );
}

export default Home;
