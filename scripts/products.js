let productList = $("#product-list");
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function updateQuantity() {
    let checkoutQuantity = $("span");
    checkoutQuantity.text(String(cartItems.length));
}

function addToCart(product) {
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function addProductCard(product) {
    let productCard = $("<article></article>");
    let heading = $("<h3></h3>");
    let description = $("<p></p>");
    let price = $("<footer></footer>");
    let image = $("<img>");
    let button = $("<button></button>");

    heading.text(product.name);
    image.attr("src", product.image);
    description.text(product.description);
    price.text(`${product.price} SEK`);
    button.text("Add to Cart");
    button.attr("id", "add-to-cart");
    button.click(() => {
        addToCart(product);
        updateQuantity();
    });
    productCard.append(heading, image, description, price, button);
    productList.append(productCard);
}

for(let product of products) {
    addProductCard(product);
}

updateQuantity();
