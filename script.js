const tabsContainer = document.getElementById('tabs-container');
const contentContainer = document.getElementById('content-container');

function displayProducts(products, categoryId) {
  contentContainer.innerHTML = '';

  const filteredProducts = products.filter(
    (product) => product.categoryId === categoryId
  );

  filteredProducts.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    productDiv.innerHTML = `
      <img src="http://rrstatic.retailrocket.net/test_task/tovar.jpg" alt="${product.productName}">
      <div class="product-name">${product.productName}</div>
    `;

    contentContainer.appendChild(productDiv);
  });
}

function createTabs(categories, products) {
  categories.forEach((category, index) => {
    const tab = document.createElement('div');
    tab.classList.add('tab');
    tab.textContent = category.categoryName;

    if (index === 0) {
      tab.classList.add('active');
      displayProducts(products, category.categoryId);
    }

    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      displayProducts(products, category.categoryId);
    });

    tabsContainer.appendChild(tab);
  });
}

fetch('data.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    return response.json();
  })
  .then((data) => {
    const { products, categories } = data;
    createTabs(categories, products);
  })
  .catch((error) => {
    console.error('Ошибка:', error);
  });
