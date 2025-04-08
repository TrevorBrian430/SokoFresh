document.addEventListener('DOMContentLoaded', function () {
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Calculate total price and display cart items
    let total = 0;
    cartContainer.innerHTML = ''; // Clear previous items

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.textContent = 'KES 0';
        return;
    }

    cartItems.forEach(item => {
        // Parse the price (remove "KES" and convert to number)
        const price = parseFloat(item.price.replace('KES ', '').replace('/kg', ''));

        // Calculate total price
        total += price * item.quantity;

        // Create HTML for each cart item
        const cartItemHTML = `
            <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
                <div class="card">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.price}</p>
                        <p class="card-text">Quantity: ${item.quantity}</p>
                        <button class="btn btn-danger remove-from-cart" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            </div>
        `;

        cartContainer.innerHTML += cartItemHTML;
    });

    // Display the total price
    cartTotalElement.textContent = `KES ${total.toFixed(2)}`;

    // Add event listeners to "Remove" buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');

            // Remove the item from the cart
            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            cartItems = cartItems.filter(item => item.id !== productId);

            // Save the updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cartItems));

            // Reload the cart page to reflect changes
            location.reload();
        });
    });
});