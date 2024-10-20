<script lang="ts">
    import type { Session } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import TimeAgo from "$lib/ui/Content/TimeAgo.svelte";
    import UAParser from "ua-parser-js";

    export let session: Session;
    export let current: boolean = false;

    let userAgent: UAParser.IResult = new UAParser(
        session.request?.userAgent ?? "",
    ).getResult();
</script>

<Labeled label="📌 ID">
    {session.id}
    {#if current}
        (Actual)
    {/if}
</Labeled>
<Labeled label="🕑 Creada">
    <TimeAgo timestamp={session.dateCreated || 0} />
</Labeled>
<Labeled label="🕑 Último uso">
    <TimeAgo timestamp={session.dateUpdated || 0} />
</Labeled>
<Labeled label="🌐 Navegador">
    {userAgent.browser.name ?? "Desconocido"}
    {userAgent.browser.version ?? ""}
</Labeled>
<Labeled label="💻 Sistema">
    {userAgent.os.name ?? userAgent.ua}
    {userAgent.os.version ?? ""}
    {userAgent.device.type ?? ""}
    {userAgent.cpu.architecture ?? ""}
</Labeled>
