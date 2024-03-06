<script lang="ts">
    export let timestamp: string | number | Date;

    let timeAgo = getUnitAndValueDate(timestamp);

    function getUnitAndValueDate(timestamp: string | number | Date) {
        const date = new Date(timestamp);
        const formatter = new Intl.RelativeTimeFormat();

        const secondsElapsed = (Date.now() - date.getTime()) / 1000;
        for (const [unit, secondsInUnit] of Object.entries({
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1,
        })) {
            if (secondsElapsed >= secondsInUnit || unit === "second") {
                const value = Math.floor(secondsElapsed / secondsInUnit) * -1;
                // @ts-ignore
                return formatter.format(value, unit);
            }
        }
    }
</script>

<span title={(new Date(timestamp)).toLocaleString()}>
    {timeAgo}
</span>
