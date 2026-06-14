// Cart Page Functions

// Update Cart UI
function updateCartUI() {
    const cart = getCart();
    const cartItemsSection = document.getElementById('cartItemsSection');
    const subtotalElement = document.getElementById('subtotal');
    const cartTotalElement = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cart.length === 0) {
        cartItemsSection.innerHTML = `
            <div class="empty-cart-container">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="index.html" class="continue-shopping-btn">Start Shopping</a>
            </div>
        `;
        checkoutBtn.disabled = true;
        subtotalElement.textContent = '₹0';
        cartTotalElement.textContent = '₹50';
    } else {
        cartItemsSection.innerHTML = cart.map(item => `
            <div class="cart-item-card">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-price-info">
                        <span class="unit-price">₹${item.price} each</span>
                        <span class="total-price">Total: ₹${item.price * item.quantity}</span>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join("");

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + 50; // Adding delivery charges

        subtotalElement.textContent = `₹${subtotal}`;
        cartTotalElement.textContent = `₹${total}`;
        checkoutBtn.disabled = false;
    }
}

// Show Checkout Modal
function showCheckoutModal() {
    const cart = getCart();
    const orderSummary = document.getElementById("orderSummary");
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 50;

    orderSummary.innerHTML = `
        <h3>Order Summary</h3>
        ${cart.map(item => `
            <div class="order-summary-item">
                <span>${item.name} x${item.quantity}</span>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `).join("")}
        <div class="order-summary-row">
            <span>Subtotal</span>
            <span>₹${subtotal}</span>
        </div>
        <div class="order-summary-row">
            <span>Delivery Charges</span>
            <span>₹50</span>
        </div>
        <div class="order-summary-total">
            <span>Total</span>
            <span>₹${total}</span>
        </div>
    `;

    checkoutModal.classList.add("active");
    checkoutForm.reset();
}

// Handle Checkout
function handleCheckout(e) {
    e.preventDefault();

    const customerName = document.getElementById("customerName").value;
    const customerPhone = document.getElementById("customerPhone").value;
    const customerAddress = document.getElementById("customerAddress").value;

    // Generate order ID
    const orderId = "ORD-" + Date.now();

    // Display confirmation
    document.getElementById("orderId").textContent = orderId;
    checkoutModal.classList.remove("active");
    confirmationModal.classList.add("active");

    // Clear cart
    cart = [];
    localStorage.removeItem('cart');
    updateCartUI();
    updateCartCount();

    // In a real application, you would send this data to a server
    console.log("Order placed:", {
        orderId,
        customer: {
            name: customerName,
            phone: customerPhone,
            address: customerAddress
        },
        items: getCart(),
        total: getCartTotal() + 50
    });
}

// Setup Event Listeners
function setupEventListeners() {
    const checkoutBtn = document.getElementById("checkoutBtn");
    const closeModal = document.getElementById("closeModal");
    const cancelCheckout = document.getElementById("cancelCheckout");
    const closeConfirmation = document.getElementById("closeConfirmation");
    const checkoutForm = document.getElementById("checkoutForm");
    const checkoutModal = document.getElementById("checkoutModal");
    const confirmationModal = document.getElementById("confirmationModal");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (getCart().length > 0) {
                showCheckoutModal();
            }
        });
    }

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            checkoutModal.classList.remove("active");
        });
    }

    if (cancelCheckout) {
        cancelCheckout.addEventListener("click", () => {
            checkoutModal.classList.remove("active");
        });
    }

    if (closeConfirmation) {
        closeConfirmation.addEventListener("click", () => {
            confirmationModal.classList.remove("active");
            window.location.href = 'index.html';
        });
    }

    if (checkoutModal) {
        checkoutModal.addEventListener("click", (e) => {
            if (e.target === checkoutModal) {
                checkoutModal.classList.remove("active");
            }
        });
    }

    if (confirmationModal) {
        confirmationModal.addEventListener("click", (e) => {
            if (e.target === confirmationModal) {
                confirmationModal.classList.remove("active");
            }
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", handleCheckout);
    }
}

// Initialize Cart Page
function initCartPage() {
    updateCartUI();
    updateCartCount();
    setupEventListeners();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCartPage);
} else {
    initCartPage();
}

