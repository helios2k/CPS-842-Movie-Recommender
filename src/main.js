let usernames = {};

// TODO: Read usernames file

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const usernameForm = document.querySelector("#username");
    //const passwordForm = document.querySelector("#password");
    const createAccountForm = document.querySelector("#createAccount");
    const signupUsernameForm = document.querySelector("#signupUsername");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
        console.log("B"); 
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        console.log("C"); 
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        console.log("A"); 
        // Perform your AJAX/Fetch login
        let username = usernameForm.value; //usernameForm.value;
        //let password = passwordForm.value;
        if (username in usernames) {
            setFormMessage(loginForm, "error", "Log in success!");
        } else {
            setFormMessage(loginForm, "error", "Error: Unknown user " + username);
        }
    });

    //TODO: event listener for sign up
    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        let signupUsername = signupUsernameForm.value;
        usernames[signupUsername] = 1;
        console.log("Created account: " + signupUsername);
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            //if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
            //    setInputError(inputElement, "Username must be at least 10 characters in length");
            //}
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
            //console.log("B"); 
        });
    });
});