import type { User } from "$lib/api";
import { writable, type Writable } from "svelte/store";

interface FxsSettingsState {
    visual: boolean,
    sound: boolean
}

interface FxsSettingsStore extends Writable<FxsSettingsState> {
    init: (user: User) => void;
    save: (user: User, state: FxsSettingsState) => void;
}

export const fxs: FxsSettingsStore = (() => {
    const { subscribe, set, update } = writable({
        visual: true,
        sound: true
    });

    const setFxs = (state: FxsSettingsState) => {
        set(state);
        if (state.visual) {
            document.body.classList.add("has-visualFxs");
        } else {
            document.body.classList.remove("has-visualFxs");
        }
    };

    return {
        subscribe, update,
        set: (value: FxsSettingsState) => {
            setFxs(value);
        },
        init: (user: User) => {
            const init = localStorage.getItem(`fxs:${user.id}`);
            const state: FxsSettingsState = init ? JSON.parse(init) : { visual: true, sound: true };

            setFxs(state);
        },
        save: (user:User, state: FxsSettingsState) => {
            localStorage.setItem(`fxs:${user.id}`, JSON.stringify(state));

            setFxs(state);
        }
    }
})();

interface SoundFxsState {
    slide: boolean,
    clack: boolean
}

interface SoundFxsStore extends Writable<SoundFxsState> {
    playSlide: () => void;
    playClack: () => void;
}

export const soundFxs: SoundFxsStore = (() => {
    const { subscribe, set, update } = writable({
        slide: false,
        clack: false
    });

    return {
        subscribe, set, update,
        playSlide: () => {
            update((state) => { 
                return {
                    ...state,
                    slide: true
                }
             })
        },
        playClack: () => {
            update((state) => {
                return {
                    ...state,
                    clack: true
                }
            })
        }
    }
})();