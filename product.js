// Product Detail Page Functions

// Get product ID from URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

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

// Get Reviews from localStorage
function getReviews(productId) {
    const reviews = localStorage.getItem(`reviews_${productId}`);
    return reviews ? JSON.parse(reviews) : [];
}

// Save Review to localStorage
function saveReview(productId, review) {
    const reviews = getReviews(productId);
    reviews.push({
        ...review,
        id: Date.now(),
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
    return reviews;
}

// Calculate Average Rating
function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
}

// Render Reviews
function renderReviews(productId) {
    const reviews = getReviews(productId);
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review!</p>';
        return;
    }

    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <div class="reviewer-info">
                    <strong class="reviewer-name">${review.name || 'Anonymous'}</strong>
                    <div class="review-rating">
                        ${renderRating(review.rating)}
                    </div>
                </div>
                <span class="review-date">${review.date}</span>
            </div>
            <p class="review-text">${review.comment}</p>
        </div>
    `).join('');
}

// Render Product Details
function renderProductDetails() {
    const productId = getProductIdFromURL();
    if (!productId) {
        document.querySelector('.product-container').innerHTML = '<p>Product not found</p>';
        return;
    }

    const product = menuItems.find(item => item.id === productId);
    if (!product) {
        document.querySelector('.product-container').innerHTML = '<p>Product not found</p>';
        return;
    }

    const reviews = getReviews(productId);
    const averageRating = reviews.length > 0 ? calculateAverageRating(reviews) : product.rating;
    const totalReviews = reviews.length > 0 ? reviews.length : product.reviews;

    const productContainer = document.getElementById('productDetails');
    if (!productContainer) return;

    productContainer.innerHTML = `
        <div class="product-image-section">
            <img src="${product.image}" alt="${product.name}" class="product-main-image">
        </div>
        <div class="product-info-section">
            <h1 class="product-title">${product.name}</h1>
            <div class="product-rating">
                ${renderRating(parseFloat(averageRating))}
                <span class="rating-value">${averageRating}</span>
                <span class="rating-count">(${totalReviews} reviews)</span>
            </div>
            <div class="product-price">₹${product.price}</div>
            <div class="product-description">
                <h3>Description</h3>
                <p>${product.fullDescription || product.description}</p>
            </div>
            <div class="product-ingredients">
                <h3>Ingredients</h3>
                <ul>
                    ${product.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
            <div class="product-actions">
                <div class="quantity-control">
                    <button class="qty-btn" onclick="changeQuantity(-1)">-</button>
                    <span id="productQuantity">1</span>
                    <button class="qty-btn" onclick="changeQuantity(1)">+</button>
                </div>
                <button class="add-to-cart-large-btn" onclick="addProductToCart()">
                    Add to Cart - ₹${product.price}
                </button>
            </div>
        </div>
        <div class="reviews-section">
            <h2>Customer Reviews</h2>
            <div class="add-review-form">
                <h3>Write a Review</h3>
                <form id="reviewForm" onsubmit="submitReview(event)">
                    <div class="form-group">
                        <label>Your Rating</label>
                        <div class="rating-input">
                            <div class="star-rating" id="starRating">
                                <span class="star-input" data-rating="1">★</span>
                                <span class="star-input" data-rating="2">★</span>
                                <span class="star-input" data-rating="3">★</span>
                                <span class="star-input" data-rating="4">★</span>
                                <span class="star-input" data-rating="5">★</span>
                            </div>
                            <span class="selected-rating-text" id="selectedRatingText">Select rating</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="reviewerName">Your Name</label>
                        <input type="text" id="reviewerName" required placeholder="Enter your name">
                    </div>
                    <div class="form-group">
                        <label for="reviewComment">Your Review</label>
                        <textarea id="reviewComment" rows="4" required placeholder="Share your experience..."></textarea>
                    </div>
                    <button type="submit" class="submit-review-btn">Submit Review</button>
                </form>
            </div>
            <div id="reviewsContainer" class="reviews-container">
                <!-- Reviews will be displayed here -->
            </div>
        </div>
    `;

    // Initialize star rating
    initializeStarRating();
    renderReviews(productId);
}

// Quantity Management
let productQuantity = 1;

function changeQuantity(change) {
    productQuantity = Math.max(1, productQuantity + change);
    document.getElementById('productQuantity').textContent = productQuantity;
    updateAddToCartButton();
}

function updateAddToCartButton() {
    const productId = getProductIdFromURL();
    const product = menuItems.find(item => item.id === productId);
    if (product) {
        const btn = document.querySelector('.add-to-cart-large-btn');
        if (btn) {
            btn.textContent = `Add to Cart - ₹${product.price * productQuantity}`;
        }
    }
}

// Add Product to Cart
function addProductToCart() {
    const productId = getProductIdFromURL();
    if (!productId) return;

    const product = menuItems.find(item => item.id === productId);
    if (!product) return;

    // Add item multiple times based on quantity
    for (let i = 0; i < productQuantity; i++) {
        addToCart(productId);
    }

    // Show notification
    showAddToCartNotification();
}

// Show Add to Cart Notification
function showAddToCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `Added ${productQuantity} item(s) to cart!`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Star Rating Selection
let selectedRating = 0;

function initializeStarRating() {
    const starInputs = document.querySelectorAll('.star-input');
    const ratingText = document.getElementById('selectedRatingText');
    
    starInputs.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            highlightStars(index + 1);
            updateRatingText(index + 1);
        });
        
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            highlightStars(selectedRating);
            updateRatingText(selectedRating);
        });
    });

    const starContainer = document.getElementById('starRating');
    if (starContainer) {
        starContainer.addEventListener('mouseleave', () => {
            highlightStars(selectedRating);
            updateRatingText(selectedRating);
        });
    }
}

function highlightStars(rating) {
    const starInputs = document.querySelectorAll('.star-input');
    starInputs.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

function updateRatingText(rating) {
    const ratingText = document.getElementById('selectedRatingText');
    if (ratingText) {
        if (rating === 0) {
            ratingText.textContent = 'Select rating';
        } else {
            ratingText.textContent = `${rating} out of 5 stars`;
        }
    }
}

// Submit Review
function submitReview(event) {
    event.preventDefault();
    const productId = getProductIdFromURL();
    
    if (selectedRating === 0) {
        alert('Please select a rating');
        return;
    }

    const reviewerName = document.getElementById('reviewerName').value;
    const reviewComment = document.getElementById('reviewComment').value;

    if (!reviewerName || !reviewComment) {
        alert('Please fill in all fields');
        return;
    }

    const review = {
        name: reviewerName,
        rating: selectedRating,
        comment: reviewComment
    };

    saveReview(productId, review);
    
    // Reset form
    document.getElementById('reviewForm').reset();
    selectedRating = 0;
    highlightStars(0);
    updateRatingText(0);

    // Re-render reviews and update rating
    renderReviews(productId);
    updateProductRating(productId);
    
    // Show success message
    showReviewSuccessMessage();
}

// Update Product Rating Display
function updateProductRating(productId) {
    const reviews = getReviews(productId);
    const product = menuItems.find(item => item.id === productId);
    
    if (reviews.length > 0) {
        const averageRating = calculateAverageRating(reviews);
        const totalReviews = reviews.length;
        
        const ratingElement = document.querySelector('.product-rating');
        if (ratingElement) {
            ratingElement.innerHTML = `
                ${renderRating(parseFloat(averageRating))}
                <span class="rating-value">${averageRating}</span>
                <span class="rating-count">(${totalReviews} reviews)</span>
            `;
        }
    }
}

// Show Review Success Message
function showReviewSuccessMessage() {
    const notification = document.createElement('div');
    notification.className = 'review-notification';
    notification.textContent = 'Thank you for your review!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Initialize Product Page
function initProductPage() {
    renderProductDetails();
    updateCartCount();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductPage);
} else {
    initProductPage();
}

