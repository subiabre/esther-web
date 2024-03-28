<script lang="ts">
    import type { Image } from "$lib/api";
    import FileSize from "$lib/ui/Content/FileSize.svelte";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import TimeAgo from "$lib/ui/Content/TimeAgo.svelte";
    import { CodeSnippet } from "carbon-components-svelte";

    export let image: Image;

</script>
<Labeled label="Archivo">
    {image.src}
</Labeled>
<Labeled label="Dimensiones de la imagen">
    {image.metadata?.width} x {image.metadata?.height}
</Labeled>
<Labeled label="Tamaño de archivo">
    <FileSize size={image.metadata?.filesize || 0} />
</Labeled>
<Labeled label="Antiguedad de archivo">
    <TimeAgo timestamp={image.metadata?.filedate || 0} />
</Labeled>
<Labeled label="Tipo MIME">
    {image.metadata?.mimeType}
</Labeled>
<Labeled label="EXIF" />
<CodeSnippet
    expanded
    type="multi"
    code={JSON.stringify(image.metadata?.exif, null, 2)}
/>
