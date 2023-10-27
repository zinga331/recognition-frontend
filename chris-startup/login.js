
// function login() {
//     // Get the username and password from the form
//     console.log('login() called');
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
// }

// Get the submit and register buttons from the DOM
const submitButton = document.getElementById('submit-button');
const registerButton = document.getElementById('register-button');

// Add event listeners to the buttons
submitButton.addEventListener('click', handleSubmit);
registerButton.addEventListener('click', handleRegister);

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    // TODO: Add form validation aresnd submission logic
}

// Function to handle registration
function handleRegister(event) {
    console.log('handleRegister() called');

    event.preventDefault();
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    console.log(`Registered username: ${username}`);
    // Sleep for a second
    setTimeout(() => {
        window.location.href = "home.html";
    }, 1000);
    // window.location.href = "home.html";


    // TODO: Add registration logic
}