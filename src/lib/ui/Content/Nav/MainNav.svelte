<script lang="ts">
    import { auth } from "$lib/stores/auth";
    import Nav from "./Nav.svelte";
    import NavItem from "./NavItem.svelte";
</script>

<Nav>
    {#if $auth.user?.roles?.includes("ROLE_ADMIN")}
        <NavItem href="#">
            <h1>Admin.</h1>
        </NavItem>
    {/if}
    <NavItem href="/fotos">
        <h1>Fotos.</h1>
        <Nav>
            <NavItem href="/fotos#filtros">
                <h2>Filtros.</h2>
            </NavItem>
            <NavItem href="/fotos#galeria">
                <h2>Galería.</h2>
            </NavItem>
            <NavItem href="/fotos#coleccion">
                <h2>Colección.</h2>
            </NavItem>
        </Nav>
    </NavItem>
    <NavItem href="/usuario">
        <h1>Usuario.</h1>
        <Nav>
            <NavItem href="/usuario#configuracion">
                <h2>Configuración.</h2>
            </NavItem>
            <NavItem href="usuario#sesiones">
                <h2>Sesiones.</h2>
            </NavItem>
        </Nav>
    </NavItem>
    <NavItem href="/bienvenido">
        <h1>Acerca de.</h1>
        <Nav>
            <NavItem href="gracias">
                <h2>Agradecimientos.</h2>
            </NavItem>
        </Nav>
    </NavItem>
</Nav>
