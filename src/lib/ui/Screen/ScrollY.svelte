<script lang="ts">
    export let div: undefined|HTMLDivElement = undefined;
</script>

<div bind:this={div} class="scroll-y">
    <slot />
</div>

<style lang="scss">
    @import "/src/app.scss";

    .scroll-y {
        width: 100vw;
        height: 100dvh;

        overflow-y: scroll;
        scroll-snap-type: y mandatory;

        display: flex;
        flex-direction: column;
        @include scroll-y-gap($slide-height);

        &:focus,
        &:focus-within,
        &:focus-visible {
            outline: none;
        }
    }
</style>
