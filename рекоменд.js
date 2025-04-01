document.addEventListener("DOMContentLoaded", function () {
  // Находим все кнопки "Добавить в корзину"
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  // Добавляем обработчик событий для каждой кнопки
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Предотвращаем стандартное поведение

      const bookId = this.dataset.bookId;
      if (bookId) {
        addToCart(bookId);
      } else {
        console.error(
          "Не найден data-book-id для кнопки 'Добавить в корзину'."
        );
      }
    });
  });
});
