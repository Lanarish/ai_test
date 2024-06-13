export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPEN_AI_API;

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
    const data = await response.json();
    console.log(data); // Отладочный вывод на сервере
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
