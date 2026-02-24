
const themeButton = document.getElementById('theme-toggle');

function toggleTheme (){
   const currentTheme = document.documentElement.getAttribute('data-theme');
   const newTheme = currentTheme === 'dark' ?  'light' : 'dark';

   document.documentElement.setAttribute('data-theme', newTheme);

   localStorage.setItem('theme', newTheme);
}


themeButton.addEventListener('click', toggleTheme);

// Carrega produtos em Nossos Destaques ---------------------------------------------------------

const featuredList = document.getElementById('featured-list');
const productList = document.getElementById('products-list');

async function fetchProducts() {

    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');

        if(!response.ok){
            throw new error('Erro ao buscar produtos');
        }

        const products = await response.json();

        if (featuredList) {
            const topProducts = products.slice(0, 5);
            displayProducts(topProducts, featuredList);
        }

        if(productList){
            displayProducts(products, productList);
        }

    } catch(error){
        console.error('Erro: ', error)
    }
}

function displayProducts(products, place) {

    place.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('article');
        card.className = 'card placeholder-card';

        card.innerHTML = `
            <div class="card-img-wrapper">
            <img src="${product.images[0]}" alt="Loading" class="card-img">
          </div>
          <div class="card-content">
            <span class="card-category">${product.category.name}</span>
            <h3 class="card-title">${product.title}</h3>
            <div class="card-footer">
              <span class="card-price">${product.price.toFixed(2).replace('.',',')}</span>
              <a href="#" class="btn-primary btn-small">Ver Detalhes</a>
            </div>
          </div>`;

          place.appendChild(card);
    });

}

fetchProducts();





