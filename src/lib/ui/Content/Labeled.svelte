<script lang="ts">
    export let label: string;

    export let bottom: boolean = false;
</script>

<p class="content-label-labeled">
    {#if bottom}
        <slot />
        <br />
        <span class="content-label-label bx--form__helper-text">{label}</span>
    {:else}
        <span class="content-label-label bx--form__helper-text">{label}</span>
        <br />
        <slot />
    {/if}
</p>

<style lang="scss">
    span {
        margin: 0;
    }
</style>
