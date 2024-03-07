<script lang="ts">
    import RangeSlider from "svelte-range-slider-pips";
    import { api } from "../../../stores/api";
    import { SkeletonPlaceholder } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";

    let values: number[] = [1960, 2024];

    let min = $api.photo
        .apiPhotosGetCollection(1, undefined, undefined, undefined, "asc")
        .then((photos) => {
            return new Date(photos[0].date.min).getFullYear();
        });

    let max = $api.photo
        .apiPhotosGetCollection(1, undefined, undefined, undefined, "desc")
        .then((photos) => {
            return new Date(photos[0].date.max || "now").getFullYear();
        });

    const dispatch = createEventDispatcher();

    function handleStop() {
        dispatch("change", {
            min: new Date(values[0], 0, 2).toISOString().split('T')[0],
            max: new Date(values[1], 11, 32).toISOString().split('T')[0],
        });
    }
</script>

{#await min}
    <SkeletonPlaceholder style="width: 100%; height: 3rem;" />
{:then min}
    {#await max}
        <SkeletonPlaceholder style="width: 100%; height: 3rem;" />
    {:then max}
        <RangeSlider
            {min}
            {max}
            pips
            range
            float
            pushy
            step={1}
            pipstep={window.innerWidth > 855 ? 10 : 15}
            all="label"
            bind:values
            on:stop={handleStop}
        />
    {/await}
{/await}

<style lang="scss">
    // @see https://simeydotme.github.io/svelte-range-slider-pips/#styling
    :global(.rangeSlider) {
        --range-slider: #{darken($color: #f2f2f2, $amount: 75)};
        --range-handle-inactive: #{#f2f2f2};
        --range-handle: #25a650;
        --range-handle-focus: #25a650;
        --range-handle-border: var(--range-handle);
        --range-range-inactive: var(--range-handle-inactive);
        --range-range: var(--range-handle-focus);
        --range-float-inactive: var(--range-handle-inactive);
        --range-float: var(--range-handle-focus);
        --range-float-text: #{black};

        --range-pip: #{darken($color: #f2f2f2, $amount: 75)};
        --range-pip-active: #{#f2f2f2};
        --range-pip-hover-text: #25a650;
        --range-pip-in-range-text: #{#f2f2f2};
    }
</style>
