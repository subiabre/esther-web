<script lang="ts">
    import SnapStop from "../Screen/SnapStop.svelte";

    export let id: string;
</script>

<SnapStop>
    <div {id} class="slide">
        <slot />
    </div>
</SnapStop>

<style lang="scss">
    @import "/src/app.scss";

    .slide {
        @include slide-sizes;

        overflow: scroll;

        background-color: white;
    }
</style>
