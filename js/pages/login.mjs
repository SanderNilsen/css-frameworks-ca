import {setAuthListener} from "../api/auth/auth.mjs"

export async function login() {
    setAuthListener()
}

login()