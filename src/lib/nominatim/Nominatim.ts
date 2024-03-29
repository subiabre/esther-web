import type { Photo } from "$lib/api";

export class Nominatim {
    protected cache = sessionStorage;

    public async search(value: string) {
        return await fetch(
            "https://nominatim.openstreetmap.org/search?" +
            new URLSearchParams({
                q: value,
                limit: "6",
                format: "json",
                addressdetails: "1",
                polygon_geojson: "1",
            }),
        ).then((res) => res.json());
    }

    public normalizeOsmId(place: any): string {
        let reference = "";
        switch (place.osm_type) {
            case "way":
                reference = `W`;
                break;
            case "node":
                reference = "N";
                break;
            default:
                reference = "R";
        }

        return reference.concat(place.osm_id);
    }

    protected normalizeCacheId(reference: string) {
        return `osmcache:${reference}`;
    }

    public async getPhotoPlace(photo: Photo) {
        if (!photo.address || !photo.address.reference) {
            return;
        }

        const cacheId = this.normalizeCacheId(photo.address.reference);
        const cachedPlace = this.cache.getItem(cacheId);

        if (cachedPlace) {
            return JSON.parse(cachedPlace);
        }

        const place = await fetch(
            "https://nominatim.openstreetmap.org/lookup?" +
            new URLSearchParams({
                osm_ids: photo.address.reference,
                format: "json",
                addressdetails: "1",
                polygon_geojson: "1",
            })
        )
            .then((res) => res.json())
            .then((data) => data[0]);

        this.cache.setItem(cacheId, JSON.stringify(place));

        return place;
    }
}
