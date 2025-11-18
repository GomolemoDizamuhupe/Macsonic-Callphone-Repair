
// Track cart items
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
const cartButtons = document.querySelectorAll('.cart-btn');
const viewCart = document.getElementById('view-cart');
const notfication = document.getElementById('notfication');

function updateCartDisplay() {
    notfication.style.backgroundColor = 'red';
    notfication.style.width = '20px';
    notfication.style.borderRadius = '50%';
    notfication.style.height = '20px';
    notfication.textContent = cart.length;
}

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const price = parseFloat(button.getAttribute('data-price'));
        const product = button.getAttribute('data-product');

        cart.push({ product, price });
        sessionStorage.setItem("cart", JSON.stringify(cart));  // Save to sessionStorage
        updateCartDisplay();
    });
});

// Display cart length if already saved
updateCartDisplay();

viewCart.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    location.href = 'checkout.html'; // Redirect to checkout
});

//LIGHTBOX
// Elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

// Open lightbox
document.querySelectorAll(".lightbox-trigger").forEach(img => {
    img.addEventListener("click", () => {
        const fullImageSrc = img.getAttribute("data-full");
        lightboxImg.src = fullImageSrc;
        lightbox.style.display = "flex";
    });
});

// Close lightbox on close button
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

//Search function
const searchBox = document.getElementById('searchBox');
const listItems = document.querySelectorAll('.product-card');

searchBox.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();

    listItems.forEach(item => {
        const productName = item.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});