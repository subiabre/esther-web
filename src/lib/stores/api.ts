import { ApiClient } from "$lib/api";
import { writable } from "svelte/store";
import { auth } from "./auth";
import { API_ADDRESS } from "$env/static/private";

export const api = writable(new ApiClient({
    BASE: API_ADDRESS,
}));

auth.subscribe((auth) => {
    api.set(new ApiClient({
        BASE: API_ADDRESS,
        TOKEN: auth.session?.token
    }))
})
