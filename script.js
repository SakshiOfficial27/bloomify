
// Cart counter
let cartCount = 0;

// Add product to cart
function addToCart(productName, price) {

    cartCount++;

    // Update cart number on website
    document.getElementById("cart-count").innerText = cartCount;

    alert(productName + " added to cart! Price: ₹" + price);
}


// Show cart information
function showCart() {

    alert("You have " + cartCount + " items in your cart.");
}


// Contact form functionality
document.getElementById("contactForm").addEventListener("submit", function(event) {

    // Prevent page from refreshing
    event.preventDefault();

    document.getElementById("form-message").innerText =
        "Thank you! Your message has been submitted.";

    // Clear form fields
    this.reset();

});
