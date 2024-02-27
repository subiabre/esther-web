<script>
    import ScrollX from "../Screen/ScrollX.svelte";
    import SnapStop from "../Screen/SnapStop.svelte";
</script>

<SnapStop>
    <ScrollX>
        <slot />
    </ScrollX>
</SnapStop>
