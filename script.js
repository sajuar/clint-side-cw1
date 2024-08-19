// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const navmenu = document.querySelector(".navul");

if (hamburger && navmenu) {
    hamburger.addEventListener("click", () => {
        // Toggle the 'active' class on both the hamburger icon and the navigation menu
        hamburger.classList.toggle("active");
        navmenu.classList.toggle("active");
});
} else {
    // Error handling if elements are not found
    console.error("Error!");
}


// Dark Mode toggle
const toggleButton = document.querySelector('.dark-light');
if (toggleButton) {
    toggleButton.addEventListener('click', () => {
         // Toggle the 'dark-mode' class on the body to switch between light and dark modes
        document.body.classList.toggle('dark-mode');
    });
}
else{
     // Error handling if the toggle button is not found
    console.log("Error!");
}



// book now button
// Get elements
const modal = document.getElementById("bookingModal");
const btn = document.getElementById("bookNowBtn");
const span = document.getElementsByClassName("close")[0];
const confirmBtn = document.getElementById("confirmBookingBtn");
const errorMessage = document.getElementById("errorMessage");
const confirmationMessage = document.querySelector(".booking-confirmation");

// Open the modal when the "Book Now" button is clicked
btn.onclick = function() {
    modal.style.display = "block";
}

// Close the modal when the "x" is clicked
span.onclick = function() {
    modal.style.display = "none";
}

// Close the modal if the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Validate time selection
function isValidTime(selectedTime) {
    const selectedDate = new Date(selectedTime);
    const hours = selectedDate.getHours();

    // Check if time is between 9 AM and 8 PM
    return hours >= 9 && hours < 20;
}

// Handle booking confirmation
confirmBtn.onclick = function() {
    const name1 = document.getElementById("name1").value;
    const email1 = document.getElementById("email1").value;
    const serviceType = document.getElementById("serviceType").value;
    const appointmentTime = document.getElementById("appointmentTime").value;

    if (name1 && email1 && serviceType && appointmentTime) {
        if (isValidTime(appointmentTime)) {
            // Save the booking details to local storage
            const bookingDetails = {
                name: name1,
                email: email1,
                serviceType: serviceType,
                appointmentTime: appointmentTime
            };

            let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
            bookings.push(bookingDetails);
            localStorage.setItem("bookings", JSON.stringify(bookings));

            // Display confirmation message
            confirmationMessage.style.display = "block";
            errorMessage.style.display = "none";

            // Clear the form after booking
            setTimeout(() => {
                confirmationMessage.style.display = "none";
                modal.style.display = "none";
                document.getElementById("name1").value = "";
                document.getElementById("email1").value = "";
                document.getElementById("serviceType").value = "";
                document.getElementById("appointmentTime").value = "";
            }, 3000);
        } else {
            // Display error message if the time is invalid
            errorMessage.style.display = "block";
        }
    } else {
        // Alert the user if any fields are left blank
        alert("Please fill out all fields.");
    }
}



// Countdown timer for special offer
const offerEndDate = new Date("August 31, 2024 23:59:59").getTime();

// Update the countdown every second
const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const timeLeft = offerEndDate - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Display the result in the countdown-timer element
  document.getElementById("countdown-timer").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the countdown is over, display an expiration message
  if (timeLeft < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown-timer").innerHTML = "OFFER EXPIRED";
  }
}, 1000);



// FAQ toggle functionality
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', event => {
        const answer = item.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});




// image slider
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // Show the next slide in the sequence
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    // Change image every 3 seconds
    setTimeout(showSlides, 3000); 
}


// Scroll to the top of the page when the button is clicked

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
};

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Contact form validation
const form = document.getElementById('contact-form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

// Handle form submission
form.addEventListener('submit', e => {
    e.preventDefault();
    const isFormValid = checkInputs();
    if (isFormValid) {
        form.submit(); 
    }
});

// Input validation function
function checkInputs() {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    let isValid = true;
 // Name validation
    if (nameValue === '') {
        setErrorFor(name, 'Name cannot be blank');
        isValid = false;
    } else {
        setSuccessFor(name);
    }
    // Email validation
    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        isValid = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        isValid = false;
    } else {
        setSuccessFor(email);
    }
// Message validation
    if (messageValue === '') {
        setErrorFor(message, 'Message cannot be blank');
        isValid = false;
    } else {
        setSuccessFor(message);
    }
// Return the validity status
    return isValid; 
}

// Set error message for invalid input
function setErrorFor(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('small');
    formGroup.className = 'form-group error';
    small.innerText = message;
}
// Set success state for valid input
function setSuccessFor(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
}
// Email validation using regex
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}




