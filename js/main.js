(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        } 
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });


    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });



    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
    // Sample product data (you can replace this with actual data from your backend)
    const products = [
        { name: "Grapes", category: "Fruits", price: "$4.99 / kg" },
        { name: "Raspberries", category: "Fruits", price: "$4.99 / kg" },
        { name: "Apricots", category: "Fruits", price: "$4.99 / kg" },
        { name: "Banana", category: "Fruits", price: "$4.99 / kg" },
        { name: "Oranges", category: "Fruits", price: "$4.99 / kg" },
        { name: "Organic Tomato", category: "Vegetables", price: "$3.12 / kg" }
    ];

    // Get references to DOM elements
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Function to display search results
    function displayResults(query) {
        searchResults.innerHTML = ''; // Clear previous results

        if (!query.trim()) {
            return; // Exit if the query is empty
        }

        // Filter products based on the query
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        // Display the filtered results
        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('border-bottom', 'pb-2', 'mb-2');
                productDiv.innerHTML = `
                    <h6>${product.name}</h6>
                    <p class="text-muted">${product.category} - ${product.price}</p>
                `;
                searchResults.appendChild(productDiv);
            });
        } else {
            searchResults.innerHTML = '<p class="text-muted">No products found.</p>';
        }
    }

    // Add event listener to the search input
    searchInput.addEventListener('input', function () {
        const query = searchInput.value;
        displayResults(query);
    });

    // Optional: Handle submit button click (if needed)
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function () {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            alert('Please enter a search term.');
            return;
        }

        // Perform the same filtering logic as above
        displayResults(query);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Add click event listeners to each button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior

            // Get the product details from the parent container
            const productContainer = this.closest('.fruite-item');
            const productId = productContainer.getAttribute('data-id');
            const productName = productContainer.querySelector('h4').textContent;
            const productPrice = productContainer.querySelector('.fs-5').textContent;
            const productImage = productContainer.querySelector('img').src;

            // Create an object for the product
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1 // Default quantity
            };

            // Retrieve existing cart items from localStorage
            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if the product is already in the cart
            const existingProduct = cartItems.find(item => item.id === productId);
            if (existingProduct) {
                // If it exists, increase the quantity
                existingProduct.quantity += 1;
            } else {
                // If not, add the product to the cart
                cartItems.push(product);
            }

            // Save the updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cartItems));

            // Optional: Show a success message
            alert(`${productName} has been added to your cart!`);
        });
    });
});