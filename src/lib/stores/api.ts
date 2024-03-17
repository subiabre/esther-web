import { ApiClient } from "$lib/api";
import { writable } from "svelte/store";
import { auth } from "./auth";

export const api = writable(new ApiClient({
    BASE: 'http://192.168.0.17:8080',
}));

auth.subscribe((auth) => {
    api.set(new ApiClient({
        BASE: 'http://192.168.0.17:8080',
        TOKEN: auth.session?.token
    }))
})
