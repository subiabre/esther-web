<script lang="ts">
    import Text from "$lib/ui/Content/Text.svelte";
    import Screen from "$lib/ui/Screen/Screen.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import SoundFxsPlayer from "$lib/fxs/SoundFxsPlayer.svelte";
    import { auth, type AuthStorage } from "$lib/stores/auth";
    import { api } from "$lib/stores/api";
    import { fxs } from "$lib/stores/fxs";
    import Pad from "$lib/ui/Content/Pad.svelte";
    import Nav from "$lib/ui/Content/Nav.svelte";
    import NavItem from "$lib/ui/Content/NavItem.svelte";

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
            .apiSessionsIdGet({ id: localAuth.session.id?.toString() || "" })
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
                    <h1>Hola, <br /> {$auth.user?.email.split("@")[0]}.</h1>
                </Text>
                <Pad>
                    <Nav>
                        <NavItem href="/fotos">Explorar.</NavItem>
                        <NavItem href="/usuario">Mi cuenta.</NavItem>
                        <NavItem href="/ranking">Ranking.</NavItem>
                        <NavItem size="small" href="/bienvenido">
                            Acerca de.
                        </NavItem>
                        <NavItem size="small" href="/gracias">
                            Agradecimientos.
                        </NavItem>
                        <NavItem size="small" href={$api.request.config.BASE}>
                            API.
                        </NavItem>
                    </Nav>
                </Pad>
            </Slide>
        </Reel>
        <slot />
    </Screen>
{/if}
