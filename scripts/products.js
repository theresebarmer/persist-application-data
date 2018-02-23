let productList = document.getElementById("product-list");

function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function addProductCard(product) {
    let productCard = document.createElement("article");
    let heading = document.createElement("h3");
    let description = document.createElement("p");
    let price = document.createElement("footer");
    let image = document.createElement("img");
    let button = document.createElement("button");

    heading.innerHTML = product.name;
    image.setAttribute("src", product.image);
    description.innerHTML= product.description;
    price.innerHTML = `${product.price} SEK`;
    button.innerHTML = "Add to Cart";
    button.setAttribute("id", "add-to-cart");
    button.addEventListener('click', () => {
        addToCart(product);
    });
    productCard.appendChild(heading);
    productCard.appendChild(image);
    productCard.appendChild(description);
    productCard.appendChild(price);
    productCard.appendChild(button);
    productList.appendChild(productCard);
}

for(let product of products) {
    addProductCard(product);
}

