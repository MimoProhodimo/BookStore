const products = [
  { id: "000", name: "Название книги 1", price: 100 },
  { id: "001", name: "Название книги 2", price: 200 },
  { id: "002", name: "Название книги 3", price: 150 },
  { id: "003", name: "Название книги 4", price: 350 },
  { id: "004", name: "Название книги 5", price: 250 },
  { id: "005", name: "Название книги 6", price: 150 },
  { id: "006", name: "Название книги 7", price: 450 },
  { id: "007", name: "Название книги 8", price: 350 },
  { id: "008", name: "Название книги 9", price: 250 },
  { id: "009", name: "Название книги 10", price: 150 },
  { id: "100", name: "Название книги 11", price: 450 },
  { id: "101", name: "Название книги 12", price: 500 },
  { id: "102", name: "Название книги 13", price: 100 },
  { id: "103", name: "Название книги 14", price: 350 },
  { id: "104", name: "Название книги 15", price: 600 },
  { id: "105", name: "Название книги 16", price: 1000 },
  { id: "106", name: "Название книги 17", price: 2250 },
  { id: "107", name: "Название книги 18", price: 450 },
  { id: "108", name: "Название книги 19", price: 200 },
  { id: "109", name: "Название книги 20", price: 100 },
  { id: "110", name: "Название книги 21", price: 150 },
  { id: "111", name: "Название книги 22", price: 200 },
  { id: "112", name: "Название книги 23", price: 250 },
  { id: "113", name: "Название книги 24", price: 1450 },
  { id: "114", name: "Название книги 25", price: 1600 },
  { id: "115", name: "Название книги 26", price: 300 },
  { id: "116", name: "Название книги 27", price: 600 },
  { id: "117", name: "Название книги 28", price: 450 },
  { id: "118", name: "Название книги 29", price: 500 },
  { id: "119", name: "Название книги 30", price: 1050 },
  { id: "200", name: "Название книги 31", price: 2250 },
  { id: "201", name: "Название книги 32", price: 1600 },
  { id: "202", name: "Название книги 33", price: 200 },
  { id: "203", name: "Название книги 34", price: 150 },
  { id: "204", name: "Название книги 35", price: 4150 },
  { id: "205", name: "Название книги 36", price: 250 },
  { id: "206", name: "Название книги 37", price: 1450 },
  { id: "207", name: "Название книги 38", price: 1600 },
  { id: "208", name: "Название книги 39", price: 300 },
  { id: "209", name: "Название книги 40", price: 600 },
];

// Функция для отображения товаров в корзине
function displayCartItems() {
  // Получаем корзину из LocalStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Получаем элемент <div> для отображения товаров
  const cartItemsContainer = document.getElementById("cart-items");

  // Если корзина пуста
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Корзина пуста.</p>";
    updateCartTotal(); // Обновляем общую сумму (она будет равна 0)
    return;
  }

  // Создаем объект для подсчета количества каждого товара
  const cartItemsCount = {};
  cart.forEach((productId) => {
    cartItemsCount[productId] = (cartItemsCount[productId] || 0) + 1;
  });

  // Создаем HTML для каждого товара в корзине
  let cartItemsHTML = "";
  for (const productId in cartItemsCount) {
    const product = products.find((p) => p.id === productId);
    const quantity = cartItemsCount[productId];

    if (product) {
      cartItemsHTML += `
          <div class="cart-item">
            <h3>${product.name}</h3>
            <p>Цена: ${product.price} руб.</p>
            <p>Количество: ${quantity}</p>
            <button class="increase-quantity" data-product-id="${productId}">+</button>
            <button class="decrease-quantity" data-product-id="${productId}">-</button>
            <button class="remove-from-cart" data-product-id="${productId}">Удалить</button>
          </div>
        `;
    }
  }

  // Вставляем HTML в элемент <div>
  cartItemsContainer.innerHTML = cartItemsHTML;

  // Добавляем обработчики событий для кнопок
  addCartEventListeners();
  updateCartTotal(); // Обновляем общую сумму
}

// Функция для добавления обработчиков событий для кнопок
function addCartEventListeners() {
  const increaseQuantityButtons =
    document.querySelectorAll(".increase-quantity");
  increaseQuantityButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.dataset.productId;
      increaseQuantity(productId);
    });
  });

  const decreaseQuantityButtons =
    document.querySelectorAll(".decrease-quantity");
  decreaseQuantityButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.dataset.productId;
      decreaseQuantity(productId);
    });
  });

  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.dataset.productId;
      removeFromCart(productId);
    });
  });
}

// Функция для увеличения количества товара
function increaseQuantity(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
  updateCartTotal();
}

// Функция для уменьшения количества товара
function decreaseQuantity(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.indexOf(productId);
  if (index > -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartTotal();
  }
}

// Функция для удаления товара из корзины
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((id) => id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
  updateCartTotal();
}

// Function to update the cart total
function updateCartTotal() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  // Create an object to count the quantity of each product
  const cartItemsCount = {};
  cart.forEach((productId) => {
    cartItemsCount[productId] = (cartItemsCount[productId] || 0) + 1;
  });

  // Calculate the total
  for (const productId in cartItemsCount) {
    const product = products.find((p) => p.id === productId);
    const quantity = cartItemsCount[productId];
    if (product) {
      total += product.price * quantity;
    }
  }

  // Update the total price in the HTML
  document.getElementById("total-price").textContent = total;
}
// Отключаем обработчик на кнопке оформленя заказа

document
  .getElementById("checkout-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("delivery-form").style.display = "block"; // Показываем форму доставки
    document.getElementById("checkout-button").style.display = "none"; //прячем кнопку "оформить заказ"
  });

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

document
  .getElementById("submit-delivery")
  .addEventListener("click", function () {
    // Получаем данные из формы
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const phone = document.getElementById("phone").value;

    // Проверяем, что все поля заполнены
    if (!name || !surname || !email || !address || !city || !phone) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return; // Прерываем выполнение функции
    }

    // Валидация email (если нужно)
    if (!validateEmail(email)) {
      alert("Пожалуйста, введите корректный email адрес.");
      return; // Прерываем выполнение функции
    }

    // Получаем выбранный способ оплаты
    const paymentMethod = document.querySelector(
      'input[name="payment"]:checked'
    ).value;

    // Определяем текст способа оплаты для отображения
    let paymentText = "";
    switch (paymentMethod) {
      case "cash":
        paymentText = "Наличными при получении";
        break;
      case "card":
        paymentText = "Банковской картой при получении";
        break;
      case "online":
        paymentText = "Онлайн оплата";
        break;
      default:
        paymentText = "Не указан";
    }

    // Выводим сообщение с введенными данными и способом оплаты
    alert(
      `Спасибо за заказ!\nИмя: ${name}\nФамилия: ${surname}\nEmail: ${email}\nАдрес: ${address}\nГород: ${city}\nТелефон: ${phone}\n\nСпособ оплаты: ${paymentText}.`
    );

    // Код для очистки корзины и скрытия формы
    localStorage.removeItem("cart");
    document.getElementById("delivery-form").style.display = "none";
    window.location.reload();
    updateCartTotal();
  });
// Вызываем функцию для отображения товаров в корзине при загрузке страницы
window.onload = displayCartItems;
