<script lang="ts">
    import SnapStop from "../Screen/SnapStop.svelte";

    export let id: string;
</script>

<SnapStop id={`slidesnap_${id}`}>
    <div {id} class="slide">
        <slot />
    </div>
</SnapStop>

<style lang="scss">
    @import "/src/app.scss";

    .slide {
        @include slide-sizes;

        overflow: scroll;

        position: relative;

        background-color: black;
    }
</style>
