<script lang="ts">
    export let id: string | number;
</script>

<div class="overlaid">
    <label for="overlaid-status_{id}">
        <input id="overlaid-status_{id}" type="checkbox" />
        <div class="overlaid-content">
            <slot />
        </div>
    </label>
</div>

<style>
    .overlaid {
        width: 100%;
        height: 100%;

        overflow: hidden;
        position: absolute;
    }

    input {
        display: none;
    }

    .overlaid-content {
        height: 100%;

        display: flex;
        align-items: end;

        opacity: 0;
        transition: opacity 0.2s ease;
        background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(255, 255, 255, 0) 100%
        );
    }

    .overlaid-content:hover {
        cursor: pointer;
    }

    input:checked + .overlaid-content {
        opacity: 1;
        transition: opacity 0.2s ease;
    }
</style>
