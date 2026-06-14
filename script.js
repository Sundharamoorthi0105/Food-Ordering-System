// Menu Data
const menuItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
        price: 450,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        description: "Traditional pizza with pepperoni and mozzarella cheese",
        price: 550,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "BBQ Chicken Pizza",
        description: "Grilled chicken, BBQ sauce, red onions, and mozzarella",
        price: 650,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Classic Burger",
        description: "Beef patty, lettuce, tomato, onion, and special sauce",
        price: 350,
        category: "burger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Cheeseburger",
        description: "Beef patty with cheese, pickles, and our signature sauce",
        price: 380,
        category: "burger",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Bacon Burger",
        description: "Beef patty, crispy bacon, cheese, and BBQ sauce",
        price: 450,
        category: "burger",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433f?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Spaghetti Carbonara",
        description: "Creamy pasta with bacon, eggs, and parmesan cheese",
        price: 520,
        category: "pasta",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Fettuccine Alfredo",
        description: "Rich and creamy pasta with parmesan and butter",
        price: 480,
        category: "pasta",
        image: "https://images.unsplash.com/photo-1598866594230-a29c5e4e7396?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        name: "Penne Arrabbiata",
        description: "Spicy tomato sauce with garlic and red chili peppers",
        price: 450,
        category: "pasta",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop"
    },
    {
        id: 10,
        name: "Coca Cola",
        description: "Refreshing cola drink",
        price: 80,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop"
    },
    {
        id: 11,
        name: "Orange Juice",
        description: "Fresh squeezed orange juice",
        price: 120,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop"
    },
    {
        id: 12,
        name: "Iced Coffee",
        description: "Cold brew coffee with ice",
        price: 150,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop"
    },
    {
        id: 13,
        name: "Chocolate Cake",
        description: "Rich chocolate cake with frosting",
        price: 280,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },
    {
        id: 14,
        name: "Ice Cream Sundae",
        description: "Vanilla ice cream with chocolate sauce and toppings",
        price: 220,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
    },
    {
        id: 15,
        name: "Cheesecake",
        description: "Creamy New York style cheesecake",
        price: 320,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=300&fit=crop"
    }
];

// Cart State
let cart = [];
let currentFilter = "all";

// DOM Elements
const menuGrid = document.getElementById("menuGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartIcon = document.getElementById("cartIcon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const confirmationModal = document.getElementById("confirmationModal");
const closeModal = document.getElementById("closeModal");
const cancelCheckout = document.getElementById("cancelCheckout");
const closeConfirmation = document.getElementById("closeConfirmation");
const checkoutForm = document.getElementById("checkoutForm");
const filterButtons = document.querySelectorAll(".filter-btn");

// Initialize
function init() {
    renderMenu();
    setupEventListeners();
    updateCartUI();
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart toggle
    cartIcon.addEventListener("click", () => {
        cartSidebar.classList.toggle("active");
    });

    closeCart.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
    });

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.category;
            renderMenu();
        });
    });

    // Checkout
    checkoutBtn.addEventListener("click", () => {
        if (cart.length > 0) {
            showCheckoutModal();
        }
    });

    // Modal controls
    closeModal.addEventListener("click", () => {
        checkoutModal.classList.remove("active");
    });

    cancelCheckout.addEventListener("click", () => {
        checkoutModal.classList.remove("active");
    });

    closeConfirmation.addEventListener("click", () => {
        confirmationModal.classList.remove("active");
        cart = [];
        updateCartUI();
        renderMenu();
    });

    // Close modal on outside click
    checkoutModal.addEventListener("click", (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.classList.remove("active");
        }
    });

    confirmationModal.addEventListener("click", (e) => {
        if (e.target === confirmationModal) {
            confirmationModal.classList.remove("active");
        }
    });

    // Form submission
    checkoutForm.addEventListener("submit", handleCheckout);
}

// Render Menu
function renderMenu() {
    const filteredItems = currentFilter === "all" 
        ? menuItems 
        : menuItems.filter(item => item.category === currentFilter);

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item">
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\'%3E%3Crect fill=\'%23667eea\' width=\'400\' height=\'300\'/%3E%3Ctext fill=\'white\' font-size=\'48\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3E${item.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="menu-item-info">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-description">${item.description}</div>
                <div class="menu-item-footer">
                    <div class="menu-item-price">₹${item.price}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

// Add to Cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
    showCartNotification();
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

// Update Quantity
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartUI();
        }
    }
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join("");
        checkoutBtn.disabled = false;
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total;
}

// Show Cart Notification
function showCartNotification() {
    cartIcon.style.transform = "scale(1.2)";
    setTimeout(() => {
        cartIcon.style.transform = "scale(1)";
    }, 200);
}

// Show Checkout Modal
function showCheckoutModal() {
    const orderSummary = document.getElementById("orderSummary");
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    orderSummary.innerHTML = `
        <h3>Order Summary</h3>
        ${cart.map(item => `
            <div class="order-summary-item">
                <span>${item.name} x${item.quantity}</span>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `).join("")}
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

    // In a real application, you would send this data to a server
    console.log("Order placed:", {
        orderId,
        customer: {
            name: customerName,
            phone: customerPhone,
            address: customerAddress
        },
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });
}

// Initialize the app
init();

