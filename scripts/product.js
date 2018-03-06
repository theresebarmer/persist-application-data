let productId = JSON.parse(sessionStorage.getItem("productId"));
let card = $("#product-card");

function sendReview(name, comment, rating) {
    $.post("http://demo.edument.se/api/reviews",
        { ProductID: productId, Name: name, Comment: comment, Rating: rating });
}

function getProduct(url, productId) {
    $.get(url + "/" + productId, (data) => {
        addProductCard(data);
    });
}

function addProductCard(product) {
    let productCard = $("<article></article>");
    let heading = $("<h3></h3>");
    let description = $("<p></p>");
    let price = $("<footer></footer>");
    let image = $("<img>");
    let reviewSection = $("<section></section>").attr("id", "review-section");
    let reviewHeader = $("<h3></h3>").text("Reviews");
    reviewSection.append(reviewHeader);
    let button = $("<button></button>");
    let reviews = product.Reviews;
    let reviewForm = $("<form></form>");
    let addName = $("<input>").attr({ id: "review-name" });
    let addReview = $("<textarea></textarea>").attr({ id: "review" });
    let postReview = $("<button></button>").attr({ id: "post-review", type: "submit"});
    postReview.text("Submit review");
    reviewForm.append(addName, addReview, postReview);

    heading.text(product.Name);
    image.attr("src", product.Image);
    description.text(product.Description);
    price.text(`${product.Price} SEK`);
    button.text("Add to Cart");
    button.attr("id", "add-to-cart");
    button.click(() => {
        addToCart(product);
        updateQuantity();
    });

    productCard.append(heading);
    productCard.append(image);
    productCard.append(description);
    productCard.append(price);
    productCard.append(button);
    for(let rev of reviews) {
        let review = $("<article></article>");
        let name = $("<p></p>");
        let comment = $("<p></p>");
        name.text(rev.Name);
        comment.text(rev.Comment);
        review.append(name);
        review.append(comment);
        reviewSection.append(review);
    }
    reviewSection.append(reviewForm);
    productCard.append(reviewSection);
    reviewForm.submit((event) => {
        sendReview(addName.val(), addReview.val(), 3);
        event.preventDefault();
        $("form :input").val("");
    });

    card.append(productCard);
}

getProduct("http://demo.edument.se/api/products", productId);
