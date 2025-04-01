const apiKey = "AIzaSyA6E27fqd7hnDfw_z7lJGN4w4qml0r3nyg";
const spreadsheetId = "1sfKiLPnio3KhewYYDwOFRVP2VjO0bur5RsTGPfQlLes";
const sheetName = "Ответы на форму (1)";

function getRandomPastelColor() {
  const base = 150; // Минимальное значение для RGB (делает цвет светлее)
  const range = 105; // Диапазон случайных значений (ограничивает насыщенность)
  const r = Math.floor(base + Math.random() * range); // Случайное значение для красного (150-255)
  const g = Math.floor(base + Math.random() * range); // Случайное значение для зеленого (150-255)
  const b = Math.floor(base + Math.random() * range); // Случайное значение для синего (150-255)
  return `rgb(${r}, ${g}, ${b})`; // Возвращаем цвет в формате rgb(r, g, b)
}

function getReviews() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const reviews = data.values;

      // Получаем контейнер для отзывов
      const reviewsContainer = document.getElementById("reviews-container");

      // Проверяем, что отзывы есть и их больше одной строки (чтобы пропустить заголовки)
      if (reviews && reviews.length > 1) {
        // Создаем HTML для каждого отзыва (начиная со второй строки)
        let reviewsHTML = "";
        for (let i = 1; i < reviews.length; i++) {
          // Начинаем с i = 1, чтобы пропустить первую строку
          const review = reviews[i];

          // Получаем данные из нужных столбцов
          const timestamp = review[0] || ""; // Время
          const name = review[1] || "Аноним"; // Имя
          const email = review[2] || ""; // Email
          const comment = review[3] || ""; // Отзыв
          const rating = review[4] || ""; // Оценка

          // Генерируем случайный цвет для фона отзыва
          const randomColor = getRandomPastelColor();

          // Создаем HTML для отзыва (теперь каждый отзыв в своем div.feedback с случайным цветом)
          reviewsHTML += `
            <div class="feedback" style="background-color: ${randomColor};">
            <h4 class = "namef">${name}</h4>
            <p class="review-text">${comment}</p>
            <p class="review-rating">Оценка: ${rating}</p>
            <p class="review-timestamp">Время: ${timestamp}</p>
             </div>
            `;
        }

        // Вставляем HTML в контейнер
        reviewsContainer.innerHTML = reviewsHTML;
      } else {
        reviewsContainer.innerHTML = "<p>Отзывов пока нет.</p>";
      }
    })
    .catch((error) => {
      console.error("Ошибка при получении отзывов:", error);
      const reviewsContainer = document.getElementById("reviews-container");
      reviewsContainer.innerHTML = "<p>Ошибка при получении отзывов.</p>";
    });
}

// Вызываем функцию для получения отзывов при загрузке страницы
window.onload = getReviews;
