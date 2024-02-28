import { EstherAPIClient } from "$lib/api";
import { writable } from "svelte/store";
import { auth } from "./auth";

export const api = writable(new EstherAPIClient({
    BASE: 'http://localhost:8080',
}));

auth.subscribe((auth) => {
    api.set(new EstherAPIClient({
        BASE: 'http://localhost:8080',
        TOKEN: auth.session?.token
    }))
})
