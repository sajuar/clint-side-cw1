//Hamburger
const hamburger = document.querySelector(".hamburger");
const navmenu = document.querySelector(".navul");

if (hamburger && navmenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navmenu.classList.toggle("active");
});
} else {
    console.error("Error!");
}




// Form
const form = document.getElementById('contact-form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

form.addEventListener('submit', e => {
    e.preventDefault();
    const isFormValid = checkInputs();
    if (isFormValid) {
        form.submit(); 
    }
});

function checkInputs() {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    let isValid = true;

    if (nameValue === '') {
        setErrorFor(name, 'Name cannot be blank');
        isValid = false;
    } else {
        setSuccessFor(name);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        isValid = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        isValid = false;
    } else {
        setSuccessFor(email);
    }

    if (messageValue === '') {
        setErrorFor(message, 'Message cannot be blank');
        isValid = false;
    } else {
        setSuccessFor(message);
    }

    return isValid; // Return the validity status
}


function setErrorFor(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('small');
    formGroup.className = 'form-group error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


// scroll to top button

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


// image slide
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// question
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', event => {
        const answer = item.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});


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
    const serviceType = document.getElementById("serviceType").value;
    const appointmentTime = document.getElementById("appointmentTime").value;

    if (serviceType && appointmentTime) {
        if (isValidTime(appointmentTime)) {
            // Save the booking details to local storage
            localStorage.setItem("serviceType", serviceType);
            localStorage.setItem("appointmentTime", appointmentTime);

            // Display confirmation message
            confirmationMessage.style.display = "block";
            errorMessage.style.display = "none";

            // Clear the form after booking
            setTimeout(() => {
                confirmationMessage.style.display = "none";
                modal.style.display = "none";
                document.getElementById("serviceType").value = "";
                document.getElementById("appointmentTime").value = "";
            }, 3000);
        } else {
            // Display error message
            errorMessage.style.display = "block";
        }
    } else {
        alert("Please select a service and time.");
    }
}
