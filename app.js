const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCart = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverly = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContant = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

let cart = [];
// getting products
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
// display products
class UI {
  displayProducts(products) {
    let result = "";
    products.some((product) => {
      result += `
        <article class="product">
          <div class="img-container">
            <img
              src="${product.image}"
              alt="${product.title}"
              class="product-img"
            />
            <button class="bag-btn" data-id="${product.id}">
              <i class="fas fa-shopping-cart">add to bag</i>
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price} a day</h4>
        </article>
     `;
      productsDOM.innerHTML = result;
    });
  }
}
// localstorage
class Storage {}
// event listeners
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  // get all productts
  products.getProducts().then((products) => ui.displayProducts(products));
});
