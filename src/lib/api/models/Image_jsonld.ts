/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageMetadata_jsonld } from './ImageMetadata_jsonld';
import type { ImageThumb_jsonld } from './ImageThumb_jsonld';
export type Image_jsonld = {
    readonly '@context'?: (string | Record<string, any>);
    readonly '@id'?: string;
    readonly '@type'?: string;
    readonly id?: number;
    src?: string;
    alt?: string | null;
    readonly thumb?: ImageThumb_jsonld;
    readonly metadata?: ImageMetadata_jsonld;
    readonly photo?: string | null;
    readonly dateCreated?: string;
    readonly dateUpdated?: string;
    readonly srcFilename?: string | null;
};

