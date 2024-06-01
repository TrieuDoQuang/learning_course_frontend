import axios from "axios";

//This function is used to handle calls to the OpenAI Chatbot API.
export const ChatbotService = async (data) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const token = "sk-proj-wFZ1j7KtFuM9A4iN1yw4T3BlbkFJaZZr28lx1WT8qx1Au7hd"; // Replace with your actual token
  const requestBody = {
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "user",
        content: data,
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const content = response.data.choices[0].message.content;
    return content;
  } catch (error) {
    console.error("Chatbot error: ", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
