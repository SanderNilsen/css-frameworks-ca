import {save} from "../../storage/save.mjs";
import {API_AUTH, API_BASE, API_LOGIN} from "../constants.mjs";
import {authFetch} from "../fetch.mjs";

/**
 * Logs in the user by sending their email and password to the authentication API.
 * On successful login, redirects the user to the `/feed/` page.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Object} The user's profile object, containing properties such as `name` and `email`.
 * @throws {Error} If login fails.
 * 
 * @example
 * try {
 *   const profile = await login("user@noroff.no", "Password123");
 *   console.log("Logged in user:", profile);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export async function login(email, password) {
    const response = await authFetch(API_BASE + API_AUTH + API_LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const { accessToken, ...profile } = (await response.json()).data;
        save("token", accessToken);
        save("profile", profile);
        window.location.href = "/feed/"; 
        return profile;
    }

    throw new Error("Could not log in to the account");
}