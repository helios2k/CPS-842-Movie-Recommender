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
        let username = usernameForm.value; //usernameForm.value;
        if (username.trim() === "") return setFormMessage(loginForm, "error", "Invalid Username");
        postData('http://localhost:8888/login', {
                username: username
            })
            .then(data => {
                console.log(data)
                if (data.success) {
                    setFormMessage(loginForm, "error", "Log in success!");
                    setTimeout(() => {
                        window.location.href = "http://localhost:8888";
                    }, 1500);
                } else setFormMessage(loginForm, "error", "Error: Unknown user \"" + username + "\"");
            });
    });


    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        let signupUsername = signupUsernameForm.value;
        if (signupUsername.trim() === "") return setFormMessage(loginForm, "error", "Invalid Username");

        postData('http://localhost:8888/create-user', {
                username: signupUsername
            })
            .then(data => {
                if (data.success) {
                    setFormMessage(loginForm, "error", "Created User");
                    setTimeout(() => {
                        window.location.href = "http://localhost:8888";
                    }, 1500);
                } else setFormMessage(loginForm, "error", "Invalid Username");
            });
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {});

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
            //console.log("B"); 
        });
    });
});

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}