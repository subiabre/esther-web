import { writable, type Writable } from "svelte/store";
import type { Session, User } from "$lib/api";

interface Auth {
    user: User | null,
    session: Session | null
}

export const auth: Writable<Auth> = writable({
    user: null,
    session: null
});