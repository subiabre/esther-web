<script lang="ts">
    export let label: string;
</script>

<p class="content-label-labeled">
    <span class="content-label-label bx--form__helper-text">{label}</span>
    <br />
    <slot />
</p>

<style lang="scss">
    span {
        margin: 0;
    }
</style>
