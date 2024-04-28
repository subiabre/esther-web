<script lang="ts">
    export let id: string | number;

    export let show: boolean = false;
    export let zIndex: number = 100;

    export let background: "gradient" | "solid" = "gradient";
</script>

<div class="overlaid" style="z-index: {zIndex}">
    <label for="overlaid-status_{id}">
        <input
            id="overlaid-status_{id}"
            type="checkbox"
            bind:checked={show}
            on:change
        />
        <div class="overlaid-content {background}">
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

    label:hover {
        cursor: pointer;
    }

    label:hover:has(> input:checked) {
        cursor: default;
    }

    input {
        display: none;
    }

    .overlaid-content {
        height: 100%;
        overflow-y: auto;

        display: flex;
        align-items: start;
        flex-direction: column;

        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    .overlaid-content.solid {
        background-color: rgba(0, 0, 0, 0.85);
    }

    .overlaid-content.gradient {
        background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(255, 255, 255, 0) 100%
        );
    }

    input:checked + .overlaid-content {
        pointer-events: all;
        opacity: 1;
        transition: opacity 0.2s ease;
    }
</style>
