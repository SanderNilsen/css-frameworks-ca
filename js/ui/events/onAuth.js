import { login } from "../../api/auth/login.js";
import { register } from "../../api/auth/register.js";
import { getPosts } from "../../api/posts/get.js";

export async function onAuth(event) {
    event.preventDefault();

    const { name, email, password } = event.target;
    const errorMessageElement = document.getElementById("error-message");
    const allowedEmailDomains = ["@noroff.no", "@stud.noroff.no"];
    const isAllowedEmail = allowedEmailDomains.some(domain => email.value.endsWith(domain));

    if (!isAllowedEmail) {
        displayError(
            "You can only register with a @noroff.no or @stud.noroff.no email address.",
            errorMessageElement
        );
        return;
    }
    
    if (!name.value && event.submitter.dataset.auth === "register") {
        displayError("Please provide your name to register.", errorMessageElement);
        return;
    }

    errorMessageElement.style.display = "none";

    try {
        if (event.submitter.dataset.auth === "login") {
            await login(email.value, password.value);
        } else {
            await register(name.value, email.value, password.value);
            await login(email.value, password.value);
        }
        await getPosts();
    } catch (error) {
        console.error(error);
        displayError(
            "An error occurred during authentication. Please try again.",
            errorMessageElement
        );
    }
}

function displayError(message, element) {
    element.textContent = message;
    element.style.display = "block";
}