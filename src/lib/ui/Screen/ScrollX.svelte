<div class="scroll-x">
    <slot />
</div>

<style lang="scss">
    @import "/src/app.scss";

    .scroll-x {
        width: 100vw;
        height: fit-content;

        overflow-x: scroll;
        scroll-snap-type: x mandatory;

        display: flex;
        flex-direction: row;
        @include scroll-x-gap($slide-width);
    }
</style>
