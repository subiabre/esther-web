<script lang="ts">
    import RangeSlider from "svelte-range-slider-pips";
    import { api } from "../../../stores/api";
    import { SkeletonPlaceholder } from "carbon-components-svelte";
    import { createEventDispatcher, onMount } from "svelte";

    let values: number[] = [0, 1];

    let min = $api.photo.apiPhotosGetCollection({ dateOrder: "asc"}).then((photos) => {
        return new Date(photos[0].date.min).getFullYear();
    });

    let max = $api.photo.apiPhotosGetCollection({ dateOrder: "desc" }).then((photos) => {
        return new Date(photos[0].date.max || "now").getFullYear();
    });

    const dispatch = createEventDispatcher();

    function handleStop() {
        dispatch("change", {
            min: new Date(values[0], 0, 2).toISOString().split("T")[0],
            max: new Date(values[1], 11, 32).toISOString().split("T")[0],
        });
    }

    onMount(async() => {
        values = [await min, await max];
    })
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
        --range-slider: #{darken($color: #fff, $amount: 75)};
        --range-handle-inactive: #{#fff};
        --range-handle: white;
        --range-handle-focus: white;
        --range-handle-border: var(--range-handle);
        --range-range-inactive: var(--range-handle-inactive);
        --range-range: var(--range-handle-focus);
        --range-float-inactive: var(--range-handle-inactive);
        --range-float: var(--range-handle-focus);
        --range-float-text: #{black};

        --range-pip: #{darken($color: #fff, $amount: 75)};
        --range-pip-active: #{#fff};
        --range-pip-hover-text: white;
        --range-pip-in-range-text: #{#fff};
    }
</style>
