<script lang="ts">
    export let label: string;
</script>

<div class="content-label">
    <p class="content-label-label bx--form__helper-text">{label}</p>
    <p class="content-label-labeled"><slot /></p>
</div>

<style>
    .content-label-label {
        margin-bottom: 0;
    }

    .content-label-labeled {
        margin-top: .5rem;
    }
</style>
