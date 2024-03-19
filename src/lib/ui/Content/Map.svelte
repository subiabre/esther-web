<script lang="ts">
    import "ol/ol.css";
    import { Map, View } from "ol";
    import Attribution from 'ol/control/Attribution.js';
    import { boundingExtent } from "ol/extent";
    import GeoJSON from 'ol/format/GeoJSON.js';
    import TileLayer from "ol/layer/Tile";
    import VectorLayer from "ol/layer/Vector";
    import { useGeographic } from "ol/proj";
    import OSM from 'ol/source/OSM.js';
    import type Source from "ol/source/Source";
    import VectorSource from "ol/source/Vector";
    import { onMount } from "svelte";

    export let place: any;

    let mapElement: HTMLDivElement;
    const mapSource = new VectorSource({
        format: new GeoJSON(),
        features: new GeoJSON().readFeatures(place.geojson),
    });

    const mapTiles = new TileLayer({
        source: new OSM({
            url: "https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png",
        }),
    });

    const mapVectors = new VectorLayer({
        source: mapSource,
        style: {
            "fill-color": "rgba(35, 35, 35, 0.5)",
            "stroke-width": 2,
            "stroke-color": "#262626",
        },
    });

    let isAfterDrag: boolean = false;

    function createMap(): Map {
        useGeographic();

        const map = new Map({
            target: mapElement,
            layers: [mapTiles, mapVectors],
            view: new View({
                zoom: 1,
                center: [place.lon, place.lat],
                padding: [15, 15, 15, 15],
            }),
            controls: [new Attribution({ collapsible: true })],
        });

        map.on("postrender", () => centerMap(map, mapSource));

        const controls = document.getElementsByClassName("ol-control");
        for (let index = 0; index < controls.length; index++) {
            const element = controls[index];

            element.addEventListener("click", (e) => e.stopPropagation());
        }

        return map;
    }

    function centerMap(map: Map, source: Source) {
        if (place.geojson.coordinates.flat(Infinity).length > 2) {
            // @ts-ignore
            map.getView().fit(source.getFeatures()[0].getGeometry());
        } else {
            const bounds: number[] = place.boundingbox.map((bound: string) =>
                Number(bound),
            );

            const extent = boundingExtent([
                [bounds[2], bounds[1]],
                [bounds[3], bounds[0]],
            ]);

            map.getView().fit(extent, { size: map.getSize() });
            map.getView().setZoom(13.5);
        }
    }

    onMount(() => {
        const map = createMap();

        map.on("moveend", (e) => {
            isAfterDrag = true;
        });

        map.on("click", (e) => {
            isAfterDrag = false;
        });

        mapElement.addEventListener("click", (e) => {
            if (isAfterDrag) {
                isAfterDrag = false;
                e.stopPropagation();
            }
        });
    });
</script>

<div class="map-container">
    <div class="map-element" bind:this={mapElement} />
</div>

<style>
    .map-container {
        max-width: 100%;
        padding-bottom: 25%;

        display: flex;
        flex-direction: column;

        position: relative;
    }

    .map-element {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
    }
</style>
