import { ApiClient } from "$lib/api";
import { writable } from "svelte/store";
import { auth } from "./auth";

const API_ADDRESS = import.meta.env.VITE_API_ADDRESS;

export const api = writable(new ApiClient({
    BASE: API_ADDRESS,
}));

auth.subscribe((auth) => {
    api.set(new ApiClient({
        BASE: API_ADDRESS,
        TOKEN: auth.session?.token
    }))
})
