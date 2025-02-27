import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../../api/UseAxiosService";
import Banner from "./Banner/Banner";
import AOS from "aos";
import "../../styles/Loader.css";
import "../../styles/Home.css";
import ListContainer from "./List/List";

function Home() {
  const navigate = useNavigate();
  const [initialFields, setInitialFields] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const rowsPerPage = 6;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await fetchData(page, rowsPerPage);
        const listData = fetchedData.data.results.map((obj) => ({
          english_title: obj.english_title,
          formId: obj.id,
          color: obj.color,
          survey_time_limit: obj.survey_time_limit,
          background_color: obj.background_color,
        }));
        setInitialFields(listData);
        setTotalPages(Math.ceil(fetchedData.data.totalCount / rowsPerPage)); // Calculate total pages
        console.log("Survey List :: ", listData);
      } catch (error) {
        console.error("Error fetching data in Home:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [page]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleFormNavigation = async (formId) => {
    try {
      navigate(`/form/${formId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="home-container">
      <Banner />
      <ListContainer
        initialFields={initialFields}
        handleFormNavigation={handleFormNavigation}
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Home;
