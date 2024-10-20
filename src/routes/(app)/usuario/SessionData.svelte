<script lang="ts">
    import type { Session } from "$lib/api";
    import { auth } from "$lib/stores/auth";
    import Labeled from "$lib/ui/Content/Labeled.svelte";
    import TimeAgo from "$lib/ui/Content/TimeAgo.svelte";
    import { SelectableTile } from "carbon-components-svelte";
    import { createEventDispatcher } from "svelte";
    import UAParser from "ua-parser-js";

    export let session: Session;
    export let current: boolean = isCurrent(session);

    const dispatch = createEventDispatcher();

    let userAgent: UAParser.IResult = new UAParser(
        session.request?.userAgent ?? "",
    ).getResult();

    function isCurrent(session: Session): boolean {
        if (session.id !== $auth.session?.id || 0) {
            return false;
        }

        return true;
    }
</script>

<SelectableTile
    title="Sesión número {session.id}"
    light={current}
    iconDescription="Sesión seleccionada"
    on:select={() => dispatch("select", session)}
    on:deselect={() => dispatch("deselect", session)}
>
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
</SelectableTile>
