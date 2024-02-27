<script>
    import SnapStop from "../Screen/SnapStop.svelte";
</script>

<SnapStop>
    <div class="slide">
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
