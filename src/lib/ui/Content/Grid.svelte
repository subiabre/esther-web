<script lang="ts">
    export let columns: number = 3;
</script>

<div class="grid" style="--grid-columns: {columns}">
    <slot />
</div>

<style lang="scss">
    @import "/src/styles/sizes.scss";

    div {
        display: grid;

        gap: 1rem;
        grid-auto-flow: dense;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 90px), 1fr));

        @include screen-size-sm(
            grid-template-columns,
            repeat(
                auto-fit,
                minmax(
                    min(
                        100%,
                        calc($slide-width-sm / var(--grid-columns) - 2rem)
                    ),
                    1fr
                )
            )
        );

        @include screen-size-md(gap, 1.175rem);
        @include screen-size-md(
            grid-template-columns,
            repeat(
                auto-fit,
                minmax(
                    min(
                        100%,
                        calc($slide-width-md / var(--grid-columns) - 1.175rem * 2)
                    ),
                    1fr
                )
            )
        );

        @include screen-size-lg(gap, 1.375rem);
        @include screen-size-lg(
            grid-template-columns,
            repeat(
                auto-fit,
                minmax(
                    min(
                        100%,
                        calc($slide-width-lg / var(--grid-columns) - 1.375rem * 2)
                    ),
                    1fr
                )
            )
        );
    }
</style>
