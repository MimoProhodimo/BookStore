// Объявление функции saveUser
function saveUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ email: email, password: password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Регистрация успешна!");
  window.location.href = "Авторизация.html";
}

// Функция отображения ошибки (displayError)
function displayError(message) {
  const errorElement = document.getElementById("registration-error");
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

// Функция обработки регистрации
async function handleRegistration(event) {
  event.preventDefault();

  const form = document.getElementById("registrationForm");
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // ... (Остальной код handleRegistration) ...

  saveUser(data.email, data.psw); // Вызов saveUser
}

// Получение формы и назначение обработчика события
const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", handleRegistration);
