<script lang="ts">
    import { onMount } from "svelte";
    import ScrollX from "../Screen/ScrollX.svelte";
    import SnapStop from "../Screen/SnapStop.svelte";

    export let id: string;

    let reelScroll: HTMLDivElement;

    let currentSlideId: string | undefined;
    function track() {
        const observer = new IntersectionObserver(
            (entries) => {
                for (let index = 0; index < entries.length; index++) {
                    const entry = entries[index];
                    const targetSlideId = entry.target.getAttribute("id") ?? "";

                    if (!entry.isIntersecting) {
                        continue;
                    }

                    if (
                        entry.intersectionRatio > 0.5 &&
                        currentSlideId !== undefined &&
                        currentSlideId === targetSlideId
                    ) {
                        let element = document.getElementById(currentSlideId);
                        element?.classList.remove("current");
                    }

                    if (
                        entry.intersectionRatio > 0.9 &&
                        currentSlideId !== undefined &&
                        currentSlideId !== targetSlideId
                    ) {
                        // play slide sound effect
                        console.log(currentSlideId);
                    }

                    if (entry.intersectionRatio > 0.9) {
                        let element = document.getElementById(targetSlideId);
                        element?.classList.add("current");

                        currentSlideId = targetSlideId;
                    }
                }
            },
            {
                root: reelScroll,
                rootMargin: "0% -5% 0% -5%",
                threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            },
        );

        reelScroll
            .querySelectorAll(".slide")
            .forEach((slide) => observer.observe(slide));
    }

    onMount(() => {
        track();
    });
</script>

<SnapStop id={`reelsnap_${id}`}>
    <ScrollX bind:div={reelScroll}>
        <slot />
    </ScrollX>
</SnapStop>
