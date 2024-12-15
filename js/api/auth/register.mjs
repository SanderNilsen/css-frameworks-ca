import {API_AUTH, API_BASE, API_REGISTER} from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

/**
 * Registers a new user.
 *
 * @async
 * @function register
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user's account.
 * @returns {Object} - An object containing user data from the API.
 * @throws {Error} Will throw an error if the request to register the account fails.
 *
 * @example
 * // Usage example
 * const name = "Ola Nordmann";
 * const email = "ola.nordmann@noroff.no";
 * const password = "Password123";
 *
 * register(name, email, password)
 *   .then(userData => console.log("User registered:", userData))
 *   .catch(error => console.error("Registration error:", error));
 */
export async function register(name, email, password) {
    const response = await authFetch(API_BASE + API_AUTH + API_REGISTER, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
        return await response.json();
    }

    throw new Error("Could not register account");
}