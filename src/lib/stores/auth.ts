import { writable, type Writable } from "svelte/store";
import type { Session, User } from "$lib/api";

export interface AuthStorage {
    user: User | null,
    session: Session | null
}

export const auth: Writable<AuthStorage> = writable({
    user: null,
    session: null
});