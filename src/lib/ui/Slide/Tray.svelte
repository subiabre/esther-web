<script lang="ts">
    import { afterUpdate } from "svelte";
    import ScrollY from "../Screen/ScrollY.svelte";
    import { soundFxs } from "$lib/stores/fxs";

    let trayScroll: HTMLDivElement;

    let currentReelId: string | undefined;
    function track() {
        const observer = new IntersectionObserver(
            (entries) => {
                for (let index = 0; index < entries.length; index++) {
                    const entry = entries[index];
                    const targetReelId = entry.target.getAttribute("id") ?? "";

                    if (!entry.isIntersecting) {
                        continue;
                    }

                    if (
                        currentReelId === targetReelId &&
                        entry.intersectionRatio < 0.9
                    ) {
                        let element = document.getElementById(targetReelId);
                        element?.classList.remove("current");

                        currentReelId = undefined;
                        soundFxs.playSlide();
                    }


                    if (
                        entry.intersectionRatio === 1 &&
                        currentReelId !== targetReelId
                    ) {
                        let element = document.getElementById(targetReelId);
                        element?.classList.add("current");

                        currentReelId = targetReelId;

                        let reelScroll = element
                            ?.getElementsByClassName("scroll-x")
                            .item(0);
                        if (reelScroll instanceof HTMLElement) {
                            reelScroll.focus();
                        }
                    }
                }
            },
            {
                root: trayScroll,
                threshold: [0.25, 0.5, 0.75, 0.9, 1],
            },
        );

        trayScroll
            .querySelectorAll(":scope > .snap-stop")
            .forEach((reel) => observer.observe(reel));
    }

    afterUpdate(() => {
        track();
    });
</script>

<ScrollY bind:div={trayScroll}>
    <slot />
</ScrollY>
