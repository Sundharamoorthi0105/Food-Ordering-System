// Cart Management Functions
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Get cart from localStorage
function getCart() {
    loadCart();
    return cart;
}

// Add to Cart
function addToCart(itemId) {
    loadCart();
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart();
    updateCartCount();
}

// Remove from Cart
function removeFromCart(itemId) {
    loadCart();
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartCount();
    if (typeof updateCartUI === 'function') {
        updateCartUI();
    }
}

// Update Quantity
function updateQuantity(itemId, change) {
    loadCart();
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCart();
            updateCartCount();
            if (typeof updateCartUI === 'function') {
                updateCartUI();
            }
        }
    }
}

// Get Cart Count
function getCartCount() {
    loadCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Update Cart Count Display
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = getCartCount();
    }
}

// Get Cart Total
function getCartTotal() {
    loadCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Initialize cart on page load
if (typeof window !== 'undefined') {
    loadCart();
    updateCartCount();
}

