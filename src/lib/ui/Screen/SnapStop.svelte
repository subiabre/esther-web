<script lang="ts">
    export let id: string;
</script>

<div {id} class="snap-stop">
    <slot />
</div>

<style>
    .snap-stop {
        scroll-snap-stop: always;
        scroll-snap-align: center;

        flex-shrink: 0;
    }
</style>
