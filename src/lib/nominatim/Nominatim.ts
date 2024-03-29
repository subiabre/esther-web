import type { Photo } from "$lib/api";

export class Nominatim {
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

    public async getPhotoPlace(photo: Photo): Promise<any> {
        if (!photo.address || !photo.address.reference) {
            return;
        }

        const cache = await caches.open('nominatim');
        const url = "https://nominatim.openstreetmap.org/lookup?" +
            new URLSearchParams({
                osm_ids: photo.address.reference,
                format: "json",
                addressdetails: "1",
                polygon_geojson: "1",
            });

        const cached = await cache.match(url);

        if (cached) {
            return await cached.json().then(data => data[0]);
        }

        await cache.add(url);
        return this.getPhotoPlace(photo);
    }
}
