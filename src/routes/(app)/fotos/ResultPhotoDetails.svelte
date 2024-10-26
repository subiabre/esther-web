<script lang="ts">
    import type { Photo } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import TimeAgo from "$lib/ui/Content/TimeAgo.svelte";

    export let photo: Photo;

</script>
<h5>Especímen</h5>
<Labeled label="ID">
    {photo.id}
</Labeled>
<Labeled label="Fecha de adición">
    <TimeAgo timestamp={photo.dateCreated || 0} />
</Labeled>
<Labeled label="Última actualización">
    <TimeAgo timestamp={photo.dateUpdated || 0} />
</Labeled>
<Labeled label="Imágenes en la fotografía">
    {photo.images.length}
</Labeled>
