import {onAuth} from "../events/onAuth.mjs";

export function setAuthListener() {
    document.getElementById("auth-form").addEventListener("submit", onAuth);
}

