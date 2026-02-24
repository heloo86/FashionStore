const htmlElement = document.documentElement;
const themeButton = document.getElementById('theme-toggle');

function toggleTheme (){
   const currentTheme = htmlElement.getAttribute('data-theme');
   const newTheme = currentTheme === 'dark' ?  'light' : 'dark';

   htmlElement.setAttribute('data-theme', newTheme);

   localStorage.setItem('theme', newTheme);
}

// Carrega produtos em Nossos Destaques ---------------------------------------------------------

themeButton.addEventListener('click', toggleTheme);


const featuredList = document.getElementById('featured-list');

async function fetchProducts() {

    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');

        if(!response.ok){
            throw new error('Erro ao buscar produtos');
        }

        const products = await response.json();
        displayProducts(products);

    } catch(error){
        console.error('Erro: ', error)
    }
}

function displayProducts(products) {

    featuredList.innerHTML = '';

    const topProducts = products.slice(0,5);

    topProducts.forEach(product => {
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

          featuredList.appendChild(card);
    });

 

}
   fetchProducts();

