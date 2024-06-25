<script lang="ts">
    import { fxs, soundFxs } from "$lib/stores/fxs";

    let controls = false;

    let slides: HTMLAudioElement[] = [];
    let clacks: HTMLAudioElement[] = [];

    $: $soundFxs.slide && playSlide();
    $: $soundFxs.clack && playClack();

    function play(sounds: HTMLAudioElement[]) {
        if (!$fxs.sound) return;
        const index = Math.floor(Math.random() * sounds.length);
        const sound = sounds[index];

        sound.currentTime = 0;
        sound.play();

        sounds
            .filter((sound, i) => i !== index)
            .map((sound) => {
                sound.pause();
                sound.currentTime = 0;
            });
    }

    function playSlide() {
        $soundFxs.slide = false;

        play(slides);
    }

    function playClack() {
        $soundFxs.clack = false;

        play(clacks);
    }
</script>

<div class="soundFxs">
    <audio {controls} bind:this={slides[0]}>
        <source src="/soundfxs/slide_01.ogg" type="audio/ogg" />
    </audio>
    <audio {controls} bind:this={slides[1]}>
        <source src="/soundfxs/slide_02.ogg" type="audio/ogg" />
    </audio>
    <audio {controls} bind:this={slides[2]}>
        <source src="/soundfxs/slide_03.ogg" type="audio/ogg" />
    </audio>
    <audio {controls} bind:this={slides[3]}>
        <source src="/soundfxs/slide_04.ogg" type="audio/ogg" />
    </audio>
    <audio {controls} bind:this={slides[4]}>
        <source src="/soundfxs/slide_05.ogg" type="audio/ogg" />
    </audio>
    <audio {controls} bind:this={slides[5]}>
        <source src="/soundfxs/slide_06.ogg" type="audio/ogg" />
    </audio>
    <audio {controls} bind:this={slides[6]}>
        <source src="/soundfxs/slide_07.ogg" type="audio/ogg" />
    </audio>
    <audio {controls} bind:this={slides[7]}>
        <source src="/soundfxs/slide_08.ogg" type="audio/ogg" />
    </audio>

    <audio {controls} bind:this={clacks[0]}>
        <source src="/soundfxs/clack_01.ogg" type="audio/ogg" />
    </audio>
    <audio {controls} bind:this={clacks[1]}>
        <source src="/soundfxs/clack_02.ogg" type="audio/ogg" />
    </audio>
</div>
