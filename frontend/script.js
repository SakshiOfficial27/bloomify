
// Backend URL
const API_BASE_URL =
    ["localhost", "127.0.0.1"].includes(window.location.hostname)
        ? "http://localhost:3000"
        : "https://bloomify-backend-iqk0.onrender.com";


// Cart counter
let cartCount = 0;

// Original flower images
const flowerImages = {
    "Pink Roses": "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=600",
    "Sunflowers": "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600",
    "Purple Flowers": "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=600"
};

// Add product to cart
function addToCart(productName, price) {
    cartCount++;

    document.getElementById("cart-count").innerText = cartCount;

    alert(productName + " added to cart! Price: ₹" + price);
}

// Show cart information
function showCart() {
    alert("You have " + cartCount + " items in your cart.");
}

// Delete flower from backend and website
async function deleteFlower(id) {
    const confirmDelete = confirm("Are you sure you want to delete this flower?");

    if (!confirmDelete) return;

    try {
        const response = await fetch(
             `${API_BASE_URL}/api/products/${id}`,
            {
               method: "DELETE"
            }

        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to delete flower");
        }

        alert(result.message);

        // Reload the flower list from backend
        loadFlowers();

    } catch (error) {
        alert("Error deleting flower: " + error.message);
    }
}

// Add flower form
const addFlowerForm = document.getElementById("addFlowerForm");

addFlowerForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("flowerName").value.trim();
    const price = Number(document.getElementById("flowerPrice").value);

    try {
        const response = await fetch(`${API_BASE_URL}/api/products`,  {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                price: price
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to add flower");
        }

        document.getElementById("add-message").innerText =
            "Flower added successfully! 🌸";

        addFlowerForm.reset();

        loadFlowers();

    } catch (error) {
        document.getElementById("add-message").innerText =
            "Error: " + error.message;
    }
});

// Display flowers from backend
async function loadFlowers() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products`);

        if (!response.ok) {
            throw new Error("Could not load flowers");
        }

        const products = await response.json();

        const container = document.querySelector(".flower-container");

        // Clear old cards before displaying updated backend data
        container.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "flower-card";

            // Flower image
            const image = document.createElement("img");
            image.src = flowerImages[product.name] ||
                "https://placehold.co/600x400?text=Flower";
            image.alt = product.name;

            // Flower name
            const heading = document.createElement("h3");
            heading.textContent = product.name;

            // Flower price
            const price = document.createElement("p");
            price.textContent = "₹" + product.price;

            // Add to Cart button
            const button = document.createElement("button");
            button.textContent = "Add to Cart";

            button.addEventListener("click", function() {
                addToCart(product.name, product.price);
            });

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";

            deleteButton.addEventListener("click", function() {
                deleteFlower(product.id);
            });

            // Add everything to the card
            card.append(image, heading, price, button, deleteButton);

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading flowers:", error);
    }
}

// Load flowers when website opens
loadFlowers();

// Contact form functionality
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    document.getElementById("form-message").innerText =
        "Thank you! Your message has been submitted.";

    this.reset();
});
