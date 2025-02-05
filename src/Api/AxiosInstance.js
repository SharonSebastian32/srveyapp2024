import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchData = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/exam-portal/v1/survey-attendees/get-feedback-survey-list`

    );
    return response.data;
  } catch (error) {
    console.errologr("Error fetching data:", error);
    throw error;
  }
};



http://206.81.17.231:8021/api/exam-portal/v1/survey-attendees/get-feedback-survey-question-list?survey_id=89


// // Example POST request
// export const sendData = async (data) => {
//   try {
//     const response = await axios.post(`${API_URL}/submit`, data);
//     return response.data;
//   } catch (error) {
//     console.error("Error sending data:", error);
//     throw error;
//   }
// };
