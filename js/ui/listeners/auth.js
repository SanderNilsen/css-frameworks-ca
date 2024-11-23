import {onAuth} from "../events/onAuth.js";

export function setAuthListener() {
    document.getElementById("auth-form").addEventListener("submit", onAuth);
}

