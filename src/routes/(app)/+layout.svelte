<script lang="ts">
    import MainNav from "$lib/ui/Content/Nav/MainNav.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import Screen from "$lib/ui/Screen/Screen.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { onMount } from "svelte";
    import { auth, type AuthStorage } from "../../stores/auth";
    import { api } from "../../stores/api";
    import { goto } from "$app/navigation";
    import { fxs } from "../../stores/fxs";
    import SoundFxsPlayer from "$lib/fxs/SoundFxsPlayer.svelte";

    let isReady = false;

    onMount(async () => {
        const localAuth: AuthStorage = await JSON.parse(
            localStorage.getItem("auth") ?? JSON.stringify({ session: null }),
        );

        if (!localStorage || !localAuth.session) {
            return goto("/hola");
        }

        $auth.session = localAuth.session;

        await $api.session
            .apiSessionsIdGet(localAuth.session.id?.toString() || "")
            .then(async (session) => {
                $auth.user = await $api.request.request({
                    method: "GET",
                    url: session.user ?? "",
                });
            })
            .catch((err) => {
                localStorage.removeItem("auth");
            });

        if ($auth.user) {
            fxs.init($auth.user);
            isReady = true;
        } else {
            return goto("/hola");
        }
    });
</script>

{#if isReady}
    <Screen>
        <SoundFxsPlayer />
        <Reel id="nav">
            <Slide id="nav">
                <Text>
                    <MainNav />
                </Text>
            </Slide>
        </Reel>
        <slot />
    </Screen>
{/if}
