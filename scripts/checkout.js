function loadItems() {

    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    let cart = document.getElementById("cart-items");

    function displayCart(product) {
        let productCard = document.createElement("article");
        let heading = document.createElement("h3");
        let description = document.createElement("p");
        let price = document.createElement("footer");
        let image = document.createElement("img");

        heading.innerHTML = product.name;
        image.setAttribute("src", product.image);
        description.innerHTML = product.description;
        price.innerHTML = `${product.price} SEK`;

        productCard.appendChild(heading);
        productCard.appendChild(image);
        productCard.appendChild(description);
        productCard.appendChild(price);
        cart.appendChild(productCard);
    }

    cartItems === null
        ? cart.innerHTML = `<h2>No items added!</h2>`
        : cartItems.forEach((item) => {
            displayCart(item);
        });
}
loadItems();