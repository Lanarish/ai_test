document.getElementById("wishButton").addEventListener("click", function () {
  document.getElementById("message").textContent = "Загрузка ...";

  // Выполняем запрос к нашему API-роуту
  fetch("/api/wish", { method: "POST" })
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
