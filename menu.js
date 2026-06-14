// Menu Display Functions
let currentFilter = "all";

// Render Star Rating
function renderRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star filled">★</span>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<span class="star half">★</span>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star">★</span>';
    }
    
    return starsHTML;
}

// Render Menu
function renderMenu() {
    const menuGrid = document.getElementById("menuGrid");
    if (!menuGrid) return;

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
                <div class="menu-item-rating">
                    ${renderRating(item.rating)}
                    <span class="rating-value">${item.rating}</span>
                    <span class="rating-count">(${item.reviews})</span>
                </div>
                <div class="menu-item-description">${item.description}</div>
                <div class="menu-item-footer">
                    <div class="menu-item-price">₹${item.price}</div>
                    <div class="menu-item-actions">
                        <button class="view-product-btn" onclick="viewProduct(${item.id})">
                            View
                        </button>
                        <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

// View Product - Navigate to product page
function viewProduct(itemId) {
    window.location.href = `product.html?id=${itemId}`;
}

// Setup Filter Buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.category;
            renderMenu();
        });
    });
}

// Initialize Menu
function initMenu() {
    renderMenu();
    setupFilters();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
} else {
    initMenu();
}

