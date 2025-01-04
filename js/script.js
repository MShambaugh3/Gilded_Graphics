// Toggle Menu for Mobile
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const slideMenu = document.querySelector('.slide-menu');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const header = document.querySelector('header');
    const overlay = document.querySelector('.overlay');  // Overlay element

    // Toggle the menu visibility
    menu.classList.toggle('active'); // Show the regular menu items when hamburger is clicked
    slideMenu.classList.toggle('active'); // Show/hide the slide menu
    hamburgerMenu.classList.toggle('active'); // Toggle hamburger visibility
    header.classList.toggle('hide-header'); // Hide the regular header when slide menu is active
    overlay.classList.toggle('active'); // Toggle overlay visibility
}

// Close the menu if the click is outside of it
document.addEventListener('click', function (e) {
    const slideMenu = document.querySelector('.slide-menu');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const overlay = document.querySelector('.overlay');
    const menu = document.querySelector('.menu'); // Regular menu

    // Check if the click was outside the slide menu, hamburger menu, or the overlay
    if (
      !slideMenu.contains(e.target) &&
      !hamburgerMenu.contains(e.target) &&
      !overlay.contains(e.target) &&
      !menu.contains(e.target) // Prevent closing the menu when clicking on menu items
    ) {
      const isMenuOpen = slideMenu.classList.contains('active');
      
      // If the menu is open, close it
      if (isMenuOpen) {
        slideMenu.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        document.querySelector('header').classList.remove('hide-header');
        overlay.classList.remove('active'); // Hide the overlay
      }
    }
});

// Close the update bar when the "X" is clicked
document.querySelector('.update-bar .close-btn').addEventListener('click', function() {
    const updateBar = document.querySelector('.update-bar');
    updateBar.style.display = 'none';
    
    // Remember the state using localStorage
    localStorage.setItem('updateBarClosed', 'true');
});

// Check if the update bar was previously closed and hide it on page load
window.addEventListener('load', function() {
    const updateBarClosed = localStorage.getItem('updateBarClosed');
    if (updateBarClosed === 'true') {
        document.querySelector('.update-bar').style.display = 'none';
    }
});

// Handle the form submission for the newsletter
document.querySelector('#newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = event.target.email.value;
    console.log("Email to send:", email);  // Debugging line

    var formData = new URLSearchParams();
    formData.append('email', email);

    fetch('https://script.google.com/macros/s/AKfycbwJ5JBcM8bBifve72o0KNshrFDj7mZjwMTGKdCjIhYBuJ1V2QCCTlXtQuUI6Qq87_f6dA/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);  // Log response from the server
        if (data === 'Success') {
            alert("Thank you for signing up!");
        } else {
            alert("Oops! Something went wrong.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Oops! Something went wrong.");
    });
});

const carouselTrack = document.querySelector('.carousel-track'); // Select the carousel track
const images = document.querySelectorAll('.carousel-img'); // Select all carousel images
const imageCount = images.length; // Get the number of images
let currentIndex = 0; // Start with the first image

function moveCarousel() {
  currentIndex = (currentIndex + 1) % imageCount; // Loop to the next image, return to 0 if at the end
  const offset = -currentIndex * 100; // Calculate the left offset percentage
  carouselTrack.style.transform = `translateX(${offset}%)`; // Move the track left
}

// Auto-rotate every 3 seconds
setInterval(moveCarousel, 3000);


// Function to toggle favorite status
function toggleLike(element, productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Get current favorites or empty array
    const product = {
      id: productId,
      name: element.closest('.product-item').querySelector('.product-title').innerText,
      price: element.closest('.product-item').querySelector('.product-price').innerText,
      image: element.closest('.product-item').querySelector('.default-img').src
    };
  
    // Log to check if the correct data is captured
    console.log('Toggled Product:', product);
  
    // Check if the product is already in the favorites
    const index = favorites.findIndex(item => item.id === productId);
  
    if (index === -1) {
      // If not, add to favorites
      favorites.push(product);
      element.src = 'images/love-it.png'; // Change heart icon to "liked"
    } else {
      // If already in favorites, remove from favorites
      favorites.splice(index, 1);
      element.src = 'images/like-it.png'; // Change heart icon to "unliked"
    }
  
    // Save the updated favorites list to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  
    // Log to see the updated favorites list in localStorage
    console.log('Updated Favorites in localStorage:', JSON.parse(localStorage.getItem('favorites')));
  }
  