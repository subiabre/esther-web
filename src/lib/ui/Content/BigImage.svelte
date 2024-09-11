<script lang="ts">
    export let src: string;

    export let alt: string;
</script>

<img {src} {alt} />

<style>
    img {
        max-width: 100%;
        max-height: 100%;

        position: absolute;
        bottom: 0;
        right: 0;
    }
</style>
