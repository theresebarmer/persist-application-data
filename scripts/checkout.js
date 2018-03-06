let cart = document.getElementById("cart-items");
let cartItems = JSON.parse(localStorage.getItem("cartItems"));

function calculateQuantity(product) {
    let quantity = 0;
    for(let item of cartItems) {
        if(item.Id === product.Id) {
            quantity++;
        }
    }
    return quantity;
}

function displayCart(product) {
    let productCard = document.createElement("article");
    let heading = document.createElement("h3");
    let description = document.createElement("p");
    let price = document.createElement("footer");
    let image = document.createElement("img");
    let quantity = document.createElement("span");

    heading.innerHTML = product.Name;
    image.setAttribute("src", product.Image);
    description.innerHTML = product.Description;
    price.innerHTML = `${product.Price} SEK`;
    quantity.innerHTML = `${calculateQuantity(product)}`;

    productCard.appendChild(heading);
    productCard.appendChild(image);
    productCard.appendChild(description);
    productCard.appendChild(price);
    productCard.appendChild(quantity);
    cart.appendChild(productCard);
}

function loadItems() {
    let deDuplicatedArray = cartItems.filter((product, index, cartItems) => {
        return cartItems.map(object => {
            return object["Name"]}).indexOf(product["Name"]) === index;
    });
    cartItems === null
        ? cart.innerHTML = `<h2>No items added!</h2>`
        : deDuplicatedArray.forEach(function(item){
            displayCart(item)
        });
}
loadItems();