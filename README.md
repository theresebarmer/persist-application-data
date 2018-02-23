### localStorage example

In this example we will use `localStorage` to store products in a cart array,
and then display these products on a checkout page.

**`localStorage`** is a global object where you can store values that will
survive page reloads and browser restarts.

(There's also `sessionStorage`, which survives page reloads, but not closing the
tab or the browser.)

Here is a rundown of the application:

### Product page
We are using the list of products that are placed in `product-data`.
This file contains an array of product objects:

```javascript
let products = [
    {
        name: "Chocolate Chip Cookies",
        price: 45,
        description: "Yummy cookies with delicious chocolate chips",
        image: "../assets/cookie-dough.jpg"
    },
    {
        name: "Cookies with coffee",
        price: 35,
        description: "Buy our finely ground Arabica coffee to enjoy with our coffee-flavoured cookies",
        image: "../assets/coffee.jpg"
    },
    {
        name: "Cookies with Skittles",
        price: 40,
        description: "Colorful Skittles makes for a great cookie eating experience",
        image: "../assets/cookies.jpg"
    }
];
```

These objects are then displayed in `products.html`, by using a `for of loop`. The code responsible
for this is contained in `/scripts/products.js`. Let's look at the code:

```javascript
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
```

When writing this code there was a series of steps.

1. Get a reference to `<section id="product-list"></section>` in views/products.html
The code:
`let productList = document.getElementById("product-list");`

2. Create a `productCard`, an collection of HTML elements representing a product.
A new card should be created for each product.
The code:
```javascript
function addProductCard(product) {
    //Create a product card
    let productCard = document.createElement("article");
    let heading = document.createElement("h3");
    let description = document.createElement("p");
    let price = document.createElement("footer");
    let image = document.createElement("img");
    let button = document.createElement("button");

    //Populate the card with data from the product we are iterating over
    heading.innerHTML = product.name;
    image.setAttribute("src", product.image);
    description.innerHTML= product.description;
    price.innerHTML = `${product.price} SEK`;
    button.innerHTML = "Add to Cart";
    button.setAttribute("id", "add-to-cart");
    
    //Add the name, image, description, price and button to the product card
    productCard.appendChild(heading);
    productCard.appendChild(image);
    productCard.appendChild(description);
    productCard.appendChild(price);
    productCard.appendChild(button);
    
    //Add the product card to the list of products that will be displayed in the page
    productList.appendChild(productCard);
}
```

3. Use a `for of loop` to loop over the array of product objects.
The code:
```javascript
for(let product of products) {
    //For every product we are looping over, call the addProductCard function
    addProductCard(product);
}
```

4. For every product, we now add a button with an event listener.
The code:
```javascript
    button.addEventListener('click', () => {
        
    });
```

5. Every time a user clicks on the "Add to Cart" button, the event listener will be fired. The
callback function will then call an "addToCart" function:
```javascript
    button.addEventListener('click', () => {
        addToCart(product);
    });
```

The "addToCart" function is responsible for adding the items to localStorage:
```javascript
function addToCart(product) {
    //Set cartItems to an empty array if it does not exist in localStorage.
    //If it does exist, it will be stored as a string in localStorage. We need
    //to convert it into an object using JSON.parse()
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
    //Add the clicked items to the array
    cartItems.push(product);
    
    //Convert our JavaScript object into a string using JSON.stringify
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
```

Clicking on an item will add it to localStorage. If you open the console in your developer tools and
write `localStorage` it will output something like this:
```
localStorage
Storage {cartItems: "[{"name":"Chocolate Chip Cookies","price":45,"desc…ing experience","image":"../assets/cookies.jpg"}]", length: 1}
cartItems
:
"[{"name":"Chocolate Chip Cookies","price":45,"description":"Yummy cookies with delicious chocolate chips","image":"../assets/cookie-dough.jpg"},{"name":"Cookies with coffee","price":35,"description":"Buy our finely ground Arabica coffee to enjoy with our coffee-flavoured cookies","image":"../assets/coffee.jpg"},{"name":"Cookies with Skittles","price":40,"description":"Colorful Skittles makes for a great cookie eating experience","image":"../assets/cookies.jpg"}]"
length: 1
__proto__: Storage
```

### Checkout page

To load the items in our checkout page, we need to use the JSON.parse() method to convert them from a string
to a JavaScript Object. The code responsible for this is contained in `../scripts/checkout.js`. Let's
look a the code:
```javascript

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
```

When writing this code there was a series of steps.

1. Load the items added to the cart from localStorage.
The code:
```javascript
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
``` 

2. Get a reference to `<section id="cart-items"></section>` in views/checkout.html
The code:
```javascript
let cart = document.getElementById("cart-items");
```

3. Create and display a product card for the added cart item.
The code:
```javascript
    function displayCart(product) {
        //Create a product card
        let productCard = document.createElement("article");
        let heading = document.createElement("h3");
        let description = document.createElement("p");
        let price = document.createElement("footer");
        let image = document.createElement("img");

        //Populate the card with data from the cart item we are iterating over
        heading.innerHTML = product.name;
        image.setAttribute("src", product.image);
        description.innerHTML = product.description;
        price.innerHTML = `${product.price} SEK`;
    
        //Add the name, image, description and price to the cart item
        productCard.appendChild(heading);
        productCard.appendChild(image);
        productCard.appendChild(description);
        productCard.appendChild(price);

        //Add the product card to the list of cart items that will be displayed in the page
        cart.appendChild(productCard);
    }
```

4. If no items have been added to the cart, display a message saying there are no items. Else,
loop over the items and display them in the cart.
The code:
```javascript
    //Check if we have any items in the array
    cartItems === null
        //If there are no items, display a message
        ? cart.innerHTML = `<h2>No items added!</h2>`
        //If there are items, loop over them and display them in the page by calling
        //the displayCart function
        : cartItems.forEach((item) => {
            displayCart(item);
        });
```

The code above is called a ternary operator. You can use an `if` statement instead of the
ternary and a `for of` loop instead of the `.forEach()` method.
```javascript
if(cartItems === null) {
    cart.innerHTML = `<h2>No items added!</h2>`
} else {
    for(let item of cartItems) {
        displayCart(item);
    }
}
```

5. Call the `loadItems` function at the end of the file. Every time a user navigates to the checkout
page, the script will be run and the function executed. So we load the items added in the products
page in the checkout page.
