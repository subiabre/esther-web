<script lang="ts">
    import { api } from "$lib/stores/api";
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";
    import { ProgressBar } from "carbon-components-svelte";
    import { onMount } from "svelte";
    import UsersRanking from "./UsersRanking.svelte";

    let mainSlide: Slide;
    onMount(() => {
        mainSlide.focus();
    });

    let users = $api.user.apiUsersGetCollection({ page: 1 });
</script>

<svelte:head>
    <title>Ranking | Esther</title>
</svelte:head>

<Reel id="ranking">
    <Slide id="positions" bind:this={mainSlide}>
        <Text>
            <h1>Ranking.</h1>
            <p>
                Cada vez que ayudas a Esther aportando datos, además de
                contribuir para que la colección esté mejor organizada, sumas
                puntos en la clasificación.
            </p>
        </Text>
        <Text>
            {#await users}
                <h2>Cargando usuarios.</h2>
            {:then users}
                <UsersRanking {users} />
            {/await}
        </Text>
    </Slide>
</Reel>
