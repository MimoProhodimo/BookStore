// Функция для добавления товара в корзину
function addToCart(bookId) {
  // Получаем текущую корзину из LocalStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Добавляем ID книги в корзину
  cart.push(bookId);

  // Сохраняем обновленную корзину в LocalStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("Книга добавлена в корзину:", bookId);

  // Обновляем счетчик товаров в корзине
  updateCartCounter();
}

// Функция для обновления счетчика товаров в корзине
function updateCartCounter() {
  // Получаем корзину из LocalStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Получаем элемент <span> для отображения количества товаров
  const cartCountElement = document.getElementById("cart-count");

  // Обновляем текст элемента <span>
  cartCountElement.textContent = cart.length;
}

// Находим все элементы книг и добавляем обработчик событий
const bookElements = document.querySelectorAll(".gallery");
bookElements.forEach((book) => {
  book.addEventListener("click", function (event) {
    // Добавляем параметр event
    event.preventDefault(); // Предотвращаем стандартное поведение
    const bookId = this.dataset.bookId;
    addToCart(bookId);
  });
});

// Вызываем функцию для обновления счетчика при загрузке страницы
window.onload = function () {
  updateCartCounter();
  // Остальной код для загрузки отзывов и т.д.
};
/// Находим кнопку корзины и добавляем обработчик событий
const cartButton = document.querySelector(".cart-button");
cartButton.addEventListener("click", function () {
  window.location.href = "корзина.html"; // Перенаправляем на страницу корзины
});
