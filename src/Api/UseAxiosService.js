import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchData = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/exam-portal/v1/survey-attendees/get-feedback-survey-list?page=${page}&limit=${limit}&status=true`
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
    console.log("Response data from the API:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error fetching form data:", error);
    throw error;
  }
};

export const PostFormQuestion = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/exam-portal/v1/survey-attendees/create-or-update-survey-attendees`,
      formData
    );
    const responseData = response.data;
    return {
      success: true,
      data: responseData,
      message: "Form data submitted successfully",
    };
  } catch (error) {
    console.log("Error posting form data:", error);
    return {
      success: false,
      error: error.message,
      message: "Failed to submit form data",
    };
  }
};
