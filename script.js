document.getElementById("wishButton").addEventListener("click", function () {
  document.getElementById("message").textContent = "Загрузка ...";

  const apiKey = "sk-proj-uYQtiCBvLz4xSufIYOXAT3BlbkFJkgPR1B8peVLEewgNf2At";

  const apiUrl = "https://api.openai.com/v1/chat/completions";

  // Тело запроса
  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Пожелание на день, ограниченное 100 символами",
      },
    ],
  };

  // Настройки запроса
  const requestOptions = {
    method: "POST", // метод запроса HTTP
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestData),
  };

  // Выполняем запрос с помощью fetch
  fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.choices && data.choices.length > 0) {
        const message = data.choices[0].message.content;
        document.getElementById("message").textContent = message;
      } else {
        document.getElementById("message").textContent =
          "Не удалось получить ответ";
      }
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("message").textContent = "Что-то пошло не так";
    });
});
