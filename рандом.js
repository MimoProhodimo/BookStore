document
  .getElementById("add-random-book")
  .addEventListener("click", function () {
    // Получаем список всех книг (products)
    const bookElements = document.querySelectorAll(".gallery");

    // Проверяем, есть ли книги на странице
    if (bookElements.length === 0) {
      alert("Нет доступных книг.");
      return;
    }

    // Выбираем случайный индекс
    const randomIndex = Math.floor(Math.random() * bookElements.length);

    // Получаем элемент книги по случайному индексу
    const randomBook = bookElements[randomIndex];

    // Получаем ID книги из атрибута data-book-id
    const bookId = randomBook.dataset.bookId;

    // Добавляем книгу в корзину (используем существующую функцию addToCart)
    addToCart(bookId);
  });
