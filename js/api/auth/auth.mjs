import {onAuth} from "../../ui/events/onAuth.mjs";

export function setAuthListener() {
    document.getElementById("auth-form").addEventListener("submit", onAuth);
}

