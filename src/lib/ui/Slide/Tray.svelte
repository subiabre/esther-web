<script lang="ts">
    import { onMount } from "svelte";
    import ScrollY from "../Screen/ScrollY.svelte";

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
                        entry.intersectionRatio > 0.5 &&
                        currentReelId !== undefined &&
                        currentReelId === targetReelId
                    ) {
                        let element = document.getElementById(currentReelId);
                        element?.classList.remove("current");
                    }

                    if (
                        entry.intersectionRatio > 0.9 &&
                        currentReelId !== undefined &&
                        currentReelId !== targetReelId
                    ) {
                        // play reel sound effect
                        console.log(currentReelId);
                    }

                    if (entry.intersectionRatio > 0.9) {
                        let element = document.getElementById(targetReelId);
                        element?.classList.add("current");

                        currentReelId = targetReelId;
                    }
                }
            },
            {
                root: trayScroll,
                rootMargin: "-5% 0% -5% 0%",
                threshold: [0.25, 0.50, 0.75, 0.9, 1],
            },
        );

        trayScroll
            .querySelectorAll(":scope > .snap-stop")
            .forEach((reel) => observer.observe(reel));
    }

    onMount(() => {
        track();
    });
</script>

<ScrollY bind:div={trayScroll}>
    <slot />
</ScrollY>
