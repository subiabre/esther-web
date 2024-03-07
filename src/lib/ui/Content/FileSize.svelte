<script lang="ts">
    export let size: number;

    let humanSize = getHumanFileSize(size);
    function getHumanFileSize(size: number): string {
        let i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return (
            Number((size / Math.pow(1024, i)).toFixed(2)) * 1 +
            " " +
            ["B", "kB", "MB", "GB", "TB"][i]
        );
    }
</script>

<span>
    {humanSize}
</span>
