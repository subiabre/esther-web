<script lang="ts">
    import type { Image } from "$lib/api";
    import FileSize from "$lib/ui/Content/FileSize.svelte";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import TimeAgo from "$lib/ui/Content/TimeAgo.svelte";
    import { CodeSnippet } from "carbon-components-svelte";

    export let image: Image;

</script>
<h5>Especímen</h5>
<Labeled label="Número de catálogo">
    #{image.id}
</Labeled>
<Labeled label="Ruta al archivo">
    {image.src}
</Labeled>
<Labeled label="Fecha de adición">
    <TimeAgo timestamp={image.dateCreated || 0} />
</Labeled>
<Labeled label="Última actualización">
    <TimeAgo timestamp={image.dateUpdated || 0} />
</Labeled>
<h5>Metadatos</h5>
<Labeled label="Dimensiones de la imagen">
    {image.metadata?.width} x {image.metadata?.height}
</Labeled>
<Labeled label="Tamaño de archivo">
    <FileSize size={image.metadata?.filesize || 0} />
</Labeled>
<Labeled label="Antiguedad de archivo">
    Última modificación <TimeAgo timestamp={image.metadata?.filedate || 0} />
</Labeled>
<Labeled label="Tipo MIME">
    {image.metadata?.mimeType}
</Labeled>
<Labeled label="Volcado EXIF" />
<CodeSnippet
    type="multi"
    copyLabel="Copiado"
    copyButtonDescription="Copiar datos EXIF"
    showLessText="Mostrar menos"
    showMoreText="Mostrar más"
    code={JSON.stringify(image.metadata?.exif, null, 2)}
/>
