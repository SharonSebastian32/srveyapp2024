import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchData = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/exam-portal/v1/survey-attendees/get-feedback-survey-list`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};

export const getFormQuestions = async (formId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/exam-portal/v1/survey-attendees/get-feedback-survey-question-list?survey_id=${formId}`
    );
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error("Error fetching form data:", error);
    throw error;
  }
};
