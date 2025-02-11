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


export const PostFormQuestion = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/exam-portal/v1/survey-attendees/create-or-update-survey-attendees`,
      formData
    );
    const responseData = response.data;
    alert("Form data submitted successfully");
    console.log("response hey", responseData);
    return {
      success: true,
      data: responseData,
      message: "Form data submitted successfully",
    };
  } catch (error) {
    console.log("Error posting form data:", error);
    alert("Failed to submit form data");
    return {
      success: false,
      error: error.message,
      message: "Failed to submit form data",
    };
  }
};


  



//  {
//  "id": 0,
//   "survey_id": 0,
//   "note": "string",
//   "attendees_answer": [
//     {
//       "id": 0,
//       "answer_type": "MultiplechoiceOneanswer",
//       "question_id": 0,
//       "custom_answer": "string",
//       "choice_answer": [
//         0
//       ],
//       "metrix_answer": [
//         {
//           "id": 0,
//           "answer_row": 0,
//           "answer_column": [
//             0
//           ]
//         }
//       ],
//       "staring": {
//         "id": 0,
//         "staring_id": 0,
//         "custom_rating": "string"
//       },
//       "other_answer": "string",
//       "excel_answer": "string"
//     }
//   ],
//   "initial_field": [
//     {
//       "id": 0,
//       "initial_id": 0,
//       "custom_answer": "string",
//       "selection_answer": [
//         0
//       ]
//     }
//   ],
//   "send_email_id": "user@example.com"
// }