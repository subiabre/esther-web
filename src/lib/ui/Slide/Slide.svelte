<script lang="ts">
    import SnapStop from "../Screen/SnapStop.svelte";

    export let id: string;

    let div: HTMLDivElement;
    export function focus() {
        div.scrollIntoView({ behavior: "smooth" });
    }
</script>

<SnapStop id={`slidesnap_${id}`}>
    <div {id} class="slide" bind:this={div}>
        <slot />
    </div>
</SnapStop>

<style lang="scss">
    @import "/src/styles/sizes.scss";

    .slide {
        @include slide-sizes;

        overflow-y: auto;

        position: relative;

        background-color: rgb(38, 38, 38);
    }
</style>
