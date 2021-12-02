let usernames = {};

// TODO: Read usernames file

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

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
        const messageElement = loginForm.querySelector(".form__message");
        messageElement.classList.remove("form--hidden");
        // Perform your AJAX/Fetch login
        let username = usernameForm.value; //usernameForm.value;
        //let password = passwordForm.value;
        if (username in usernames) {
            setFormMessage(loginForm, "error", "Log in success!");
        } else {
            setFormMessage(loginForm, "error", "Error: Unknown user \"" + username + "\"");
        }
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        let signupUsername = signupUsernameForm.value;
        usernames[signupUsername] = 1;
        console.log("Created account: " + signupUsername);

        delay(5000).then(() => console.log('ran after 5 seconds passed'));

        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");

        const messageElement = loginForm.querySelector(".form__message");
        messageElement.classList.remove("form__message--success", "form__message--error");
        //messageElement.classList.add(`form__message--test`);
        messageElement.classList.add("form--hidden");

        
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
            //console.log("B"); 
        });
    });
});