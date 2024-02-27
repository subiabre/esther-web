<div class="scroll-y">
    <div class="snap-stop">
        <div class="scroll-x">
            <div class="snap-stop">
                <div class="slide bg-bluepink">1-1</div>
            </div>
            <div class="snap-stop">
                <div class="slide bg-bluepink">1-2</div>
            </div>
            <div class="snap-stop">
                <div class="slide bg-bluepink">1-3</div>
            </div>
        </div>
    </div>
    <div class="snap-stop">
        <div class="scroll-x">
            <div class="snap-stop">
                <div class="slide bg-bluepink">2-1</div>
            </div>
            <div class="snap-stop">
                <div class="slide bg-bluepink">2-2</div>
            </div>
            <div class="snap-stop">
                <div class="slide bg-bluepink">2-3</div>
            </div>
        </div>
    </div>
    <div class="snap-stop">
        <div class="scroll-x">
            <div class="snap-stop">
                <div class="slide bg-bluepink">3-1</div>
            </div>
            <div class="snap-stop">
                <div class="slide bg-bluepink">3-2</div>
            </div>
            <div class="snap-stop">
                <div class="slide bg-bluepink">3-3</div>
            </div>
        </div>
    </div>
</div>

<style>
    .bg-bluepink {
        background: repeating-conic-gradient(blue 0% 25%, pink 0% 50%) 50% / 50%
            50%;
    }

    * {
        --slide-width: 85vw;
        --slide-height: 90svh;
        background-color: black;
    }

    .scroll-y {
        width: 100vw;
        height: 100svh;

        overflow-y: scroll;
        scroll-snap-type: y mandatory;

        display: flex;
        flex-direction: column;
        row-gap: 2.5vh;
    }

    .scroll-y > .snap-stop:first-child {
        margin-top: 5vh;
    }

    .scroll-y > .snap-stop:last-child {
        margin-bottom: 5vh;
    }

    .scroll-x {
        width: 100vw;
        height: 90svh;

        overflow-x: scroll;
        scroll-snap-type: x mandatory;

        display: flex;
        flex-direction: row;
        column-gap: 2.5vh;
    }

    .scroll-x > .snap-stop:first-child {
        margin-left: 5vh;
    }

    .scroll-x > .snap-stop:last-child {
        margin-right: 5vh;
    }

    .snap-stop {
        scroll-snap-stop: always;
        scroll-snap-align: center;

        flex-shrink: 0;
    }

    .slide {
        width: var(--slide-width);
        height: var(--slide-height);
    }
</style>
