document.addEventListener("DOMContentLoaded", function () {
  // *** Код динамической смены кнопки ***
  const authButton = document.getElementById("auth-button"); // Получаем ссылку на кнопку
  const loggedInUser = localStorage.getItem("loggedInUser"); // Проверяем, авторизован ли пользователь

  if (authButton) {
    // Убеждаемся, что кнопка существует на странице
    if (loggedInUser) {
      // Пользователь авторизован
      authButton.textContent = "Личный кабинет"; // Меняем текст кнопки
      authButton.href = "профиль.html"; // Меняем ссылку кнопки
    } else {
      // Пользователь не авторизован
      authButton.textContent = "Авторизация"; // Возвращаем текст кнопки
      authButton.href = "Авторизация.html"; // Возвращаем ссылку кнопки
    }
  }
  // *** Конец кода динамической смены кнопки ***

  function checkCredentials(email, password) {
    console.log(
      "Вызвана функция checkCredentials с email:",
      email,
      "и password:",
      password
    );
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Содержимое localStorage:", users);
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      console.log("Учетные данные верны. Пользователь:", user);
      localStorage.setItem("loggedInUser", email);
      alert("Вход выполнен успешно!");
      window.location.href = "index.html";
      return true;
    } else {
      console.log("Неверный email или пароль.");
      alert("Неверный email или пароль.");
      return false;
    }
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      console.log("Форма отправлена");
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      console.log("Email:", email, "Password:", password);
      checkCredentials(email, password);
    });
  }

  function isLoggedIn() {
    return localStorage.getItem("loggedInUser") !== null;
  }

  function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Выход выполнен!");
    window.location.href = "index.html";
  }
  if (!isLoggedIn()) {
  }
});
