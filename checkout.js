
const checkoutContainer = document.getElementById("checkoutContainer");
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

function renderCheckout() {
    checkoutContainer.innerHTML = "";

    if (cart.length === 0) {
        checkoutContainer.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
          <span>${index + 1}. ${item.product}</span>
          <span>R${item.price.toFixed(2)}</span>
        `;
        checkoutContainer.appendChild(itemDiv);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalDiv = document.createElement("div");
    totalDiv.className = "total";
    totalDiv.textContent = `Total: R${total.toFixed(2)}`;
    checkoutContainer.appendChild(totalDiv);

    const btnContainer = document.createElement("div");
    btnContainer.className = "btns";

    const clearBtn = document.createElement("button");
    clearBtn.className = "clear-btn";
    clearBtn.textContent = "Clear Cart";
    clearBtn.onclick = () => {
        if (confirm("Are you sure you want to clear your cart?")) {
            sessionStorage.removeItem("cart");
            cart = [];
            renderCheckout();
        }
    };

    const backBtn = document.createElement("button");
    backBtn.className = "back-btn";
    backBtn.textContent = "Back to Shop";
    backBtn.onclick = () => {
        location.href = "shop.html";
    };

    btnContainer.appendChild(backBtn);
    btnContainer.appendChild(clearBtn);
    checkoutContainer.appendChild(btnContainer);
}

renderCheckout();