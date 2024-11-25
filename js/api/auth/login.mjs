import {save} from "../../storage/save.mjs";
import {API_AUTH, API_BASE, API_LOGIN} from "../constants.mjs";
import {authFetch} from "../fetch.mjs";

export async function login(email, password) {
    const response = await authFetch(API_BASE + API_AUTH + API_LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const { accessToken, ...profile } = (await response.json()).data;
        save("token", accessToken);
        save("profile", profile);
        window.location.href = "/profile/";
        return profile;
    }

    throw new Error("Could not log in to the account");
}