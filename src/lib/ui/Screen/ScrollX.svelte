<script lang="ts">
    export let div: undefined|HTMLDivElement;
</script>

<div bind:this={div} class="scroll-x">
    <slot />
</div>

<style lang="scss">
    @import "/src/styles/scroll.scss";

    .scroll-x {
        width: 100vw;
        height: fit-content;

        overflow-x: scroll;
        scroll-snap-type: x mandatory;

        display: flex;
        flex-direction: row;
        @include scroll-x-gap($slide-width);

        &:focus,
        &:focus-within,
        &:focus-visible {
            outline: none;
        }
    }
</style>
