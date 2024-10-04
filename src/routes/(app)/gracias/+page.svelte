<script lang="ts">
    import { onMount } from "svelte";
    import { afterNavigate } from "$app/navigation";
    import Text from "$lib/ui/Content/Text.svelte";
    import Reel from "$lib/ui/Slide/Reel.svelte";
    import Slide from "$lib/ui/Slide/Slide.svelte";

    let mainSlide: Slide;
    onMount(() => {
        mainSlide.focus();
    });

    afterNavigate(() => {
        mainSlide.focus();
    });
</script>

<svelte:head>
    <title>Gracias | Esther</title>
</svelte:head>

<Reel id="bienvenido">
    <Slide id="🙋" bind:this={mainSlide}>
        <Text>
            <h1>Gracias.</h1>
            <h2>🥰</h2>
            <p>
                Esther camina sobre hombros de gigantes. Si tu nombre aparece
                aquí: Gracias.
            </p>
            <h3>Software.</h3>
            <p>
                Esther es una aplicación de dos partes que funciona gracias a
                diferentes tecnologías de código abierto.
            </p>
            <p>
                Una <a href="https://github.com/subiabre/esther-api">API</a>
                web construida con
                <a href="https://www.docker.com/">Docker</a>,
                <a href="https://mariadb.org/">MariaDB</a>,
                <a href="https://www.nginx.com/">Nginx</a>,
                <a href="https://www.php.net/">PHP</a>,
                <a href="https://getcomposer.org/">Composer</a>,
                <a href="https://symfony.com/">Symfony</a>,
                <a href="https://api-platform.com/">API Platform</a> y
                <a href="https://www.doctrine-project.org/">Doctrine</a>.
            </p>
            <p>
                Gracias, también, a los mantenedores de
                <a href="https://github.com/ScientaNL/DoctrineJsonFunctions"
                    >DoctrineJsonFunctions</a
                >,
                <a href="http://flysystem.thephpleague.com/docs/">Flysystem</a>,
                <a href="http://image.intervention.io/v3">Intervention Image</a>
                y
                <a href="https://github.com/loilo/Fuse">Fuse</a> por acelerar mi
                trabajo.
            </p>
            <p>
                El <a href="https://github.com/subiabre/esther-web"
                    >cliente web</a
                >, la aplicación que estás viendo ahora, funciona gracias a
                <a href="https://kit.svelte.dev/">Svelte Kit</a> con
                <a href="https://www.typescriptlang.org/">TypeScript</a> sobre
                <a href="https://nodejs.org/en">Node.js</a>. Usa además:
            </p>
            <p>
                La librería de componentes UI de IBM
                <a href="https://svelte.carbondesignsystem.com/">Carbon</a>
                para Svelte y el preprocesador de CSS
                <a href="https://sass-lang.com/">Sass</a>; el buscador
                <a href="https://nominatim.org/">Nominatim</a>
                para
                <a href="https://www.openstreetmap.org/about">OpenStreetMap</a>
                y mapas de
                <a href="http://github.com/openlayers/openlayers">OpenLayers</a>
                con el arte raster de
                <a href="https://stadiamaps.com/">Stadia Maps</a>; además de los
                paquetes de <a href="https://www.npmjs.com/">npm</a>:
                <a href="http://github.com/simeydotme/svelte-range-slider-pips">
                    Svelte Range Slider
                </a>
                y
                <a href="http://github.com/faisalman/ua-parser-js"
                    >UAParser.js</a
                >.
            </p>
            <h3>Personas.</h3>
            <p>Las siguientes personas han ayudado a que Esther sea posible.</p>
            <p>
                <a href="https://freesound.org/people/soundslikewillem/"
                    >Willem Sannen</a
                >, por sus efectos de sonido.
            </p>
            <p>
                <a href="https://www.instagram.com/s.su_art"
                    >Su Shitong</a
                >, por contribuir con su arte para el personaje de Esther.
            </p>
            <p>
                <a href="https://www.instagram.com/nazafalivene"
                    >Nazareno Falivene</a
                >, por aportar ideas y criticismo durante la fase final de
                desarrollo.
            </p>
            <p>
                Ludim Estrada, por prestar material para pruebas de prototipado
                y calidad.
            </p>
            <p>
                Nora García, por su cariño y contribución con fotos originales.
            </p>
            <p>
                Denis Subiabre, por aportar ideas y criticismo durante la fase
                final de desarrollo y por ocuparse de muchas cosas para que yo
                pueda escribir código.
            </p>
            <p>
                Evelyn Subiabre, por aportar ideas y criticismo al proyecto
                desde su concepción, así como por prestar material para pruebas
                de calidad.
            </p>
            <p>
                Denis (de nuevo), Evelyn (de nuevo) y Karina, por su cariño y
                apoyo sostenido a lo largo del tiempo y por mantenerme activo.
            </p>
            <p>
                Denis (de nuevo), Evelyn (de nuevo) y Karina (de nuevo), Marcos,
                Cristian, Gastón y Nora (de nuevo), por servir de inspiración
                para este proyecto.
            </p>
            <p>Mónica García, sin la cual nada de esto hubiera ocurrido.</p>
        </Text>
    </Slide>
</Reel>
