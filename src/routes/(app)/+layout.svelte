<script lang="ts">
    import MainNav from "$lib/ui/Content/Nav/MainNav.svelte";
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { onMount } from "svelte";
    import { auth, type AuthStorage } from "../../stores/auth";
    import { api } from "../../stores/api";
    import { goto } from "$app/navigation";
    import { fxs } from "../../stores/fxs";

    onMount(async () => {
        const localAuth: AuthStorage = await JSON.parse(
            localStorage.getItem("auth") ?? JSON.stringify({ session: null }),
        );

        if (!localAuth.session) {
            return goto('/hola');
        }

        $auth.session = localAuth.session;
        $auth.user = await $api.request.request({
            method: "GET",
            url: localAuth.session.user ?? "",
        });

        if ($auth.user) {
            fxs.init($auth.user);
        }
    });
</script>

<Reel id="nav">
    <Slide id="nav">
        <Text>
            <MainNav />
        </Text>
    </Slide>
</Reel>
<slot />
