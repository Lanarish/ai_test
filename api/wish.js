export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPEN_AI_API;

  if (!apiKey) {
    res.status(500).json({ message: "API key is missing" });
    return;
  }

  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Пожелание на день, ограниченное 100 символами",
      },
    ],
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestData),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      // Если ответ не ok, выводим дополнительную информацию
      const errorData = await response.text();
      console.error("Error from OpenAI API:", response.status, errorData);
      res
        .status(response.status)
        .json({ message: "Error from OpenAI API", details: errorData });
      return;
    }
    const data = await response.json();
    console.log("Data received from OpenAI API:", data); // Отладочный вывод на сервере
    res.status(200).json(data);
  } catch (error) {
    console.error("Error during API request:", error);
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
}
