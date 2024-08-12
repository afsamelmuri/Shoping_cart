// Product class
class Product {
  constructor(product_id, name, quantity) {
    this.product_id = product_id;
    this.name = name;
    this.quantity = quantity;
  }
}

// Cart class
class Cart {
  constructor() {
    this.products = [];
  }

  // Add product to cart
  addProduct(product) {
    // Check if the product already exists in the cart
    let existingProduct = this.products.find(
      (p) => p.product_id === product.product_id
    );
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.products.push(product);
    }
  }

  // Remove product from cart
  removeProduct(product_id) {
    this.products = this.products.filter(
      (product) => product.product_id !== product_id
    );
  }

  // Display products in cart
  displayCart() {
    let message = "Products in Cart:\n";
    let totalProducts = this.products.length;
    let totalQuantities = 0;

    this.products.forEach((product, index) => {
      message += `${index + 1}. ${product.name} (ID: ${
        product.product_id
      }) - Quantity: ${product.quantity}\n`;
      totalQuantities += product.quantity;
    });

    message += `\nTotal Products: ${totalProducts}\nTotal Quantities: ${totalQuantities}`;

    return message;
  }

  // Get cart items as HTML
  getCartItemsHtml() {
    if (this.products.length === 0) {
      return "<p>Your cart is empty.</p>";
    }

    let html = "<ul>";
    this.products.forEach((product, index) => {
      html += `<li>${product.name} (ID: ${product.product_id}) - Quantity: ${product.quantity}</li>`;
    });
    html += "</ul>";

    return html;
  }
}

// Initialize cart
let cart = new Cart();

// Handle add product form submission
document
  .getElementById("addProductForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let product_id = document.getElementById("product_id").value;
    let name = document.getElementById("name").value;
    let quantity = parseInt(document.getElementById("quantity").value);

    let product = new Product(product_id, name, quantity);
    cart.addProduct(product);

    alert("Product added to cart!");
    document.getElementById("addProductForm").reset();
  });

// Handle remove product form submission
document
  .getElementById("removeProductForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let product_id = document.getElementById("remove_product_id").value;

    cart.removeProduct(product_id);

    alert("Product removed from cart!");
    document.getElementById("removeProductForm").reset();
  });

// Display cart contents in an alert
function displayCart() {
  alert(cart.displayCart());
  document.getElementById("cartItems").innerHTML = cart.getCartItemsHtml();
}
