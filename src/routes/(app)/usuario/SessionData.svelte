<script lang="ts">
    import type { Session } from "$lib/api";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import TimeAgo from "$lib/ui/Content/TimeAgo.svelte";
    import { auth } from "../../../stores/auth";
    import UAParser from "ua-parser-js";

    export let session: Session;

    let userAgent: UAParser.IResult = new UAParser(
        session.request?.userAgent ?? "",
    ).getResult();
</script>

<Labeled label="👉 Identificador">
    {session.id}
    {#if session.id == ($auth.session?.id ?? "")}
        (actual)
    {/if}
</Labeled>
<Labeled label="🕑 Creada">
    <TimeAgo timestamp={session.dateCreated ?? ""} />
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
