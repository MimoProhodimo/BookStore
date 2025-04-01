document.addEventListener("DOMContentLoaded", function () {
  // Получаем данные пользователя из localStorage
  const loggedInUserEmail = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.email === loggedInUserEmail);

  // Если пользователь авторизован, отображаем его данные
  if (user) {
    document.getElementById("user-email").textContent = user.email;

    // Получаем Data URL аватарки из localStorage
    const avatarDataUrl =
      localStorage.getItem("avatarDataUrl") || "Без имени.png"; // Аватар по умолчанию
    document.getElementById("user-avatar").src = avatarDataUrl;
  } else {
    // Если пользователь не авторизован, перенаправляем на страницу авторизации
    window.location.href = "Авторизация.html";
  }

  // Обработчик события для кнопки "Выход"
  document
    .getElementById("logout-button")
    .addEventListener("click", function () {
      localStorage.removeItem("loggedInUser");
      window.location.href = "Авторизация.html";
    });

  // Обработчик события для кнопки "Сохранить аватарку"
  document.getElementById("save-avatar").addEventListener("click", function () {
    const fileInput = document.getElementById("avatar-file");
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = function () {
        const avatarDataUrl = reader.result; // Data URL изображения
        localStorage.setItem("avatarDataUrl", avatarDataUrl); // Сохраняем Data URL в localStorage
        document.getElementById("user-avatar").src = avatarDataUrl; // Обновляем аватарку на странице
      };

      reader.readAsDataURL(file); // Читаем файл как Data URL
    }
  });
});
