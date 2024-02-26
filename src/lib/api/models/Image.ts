/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageMetadata } from './ImageMetadata';
import type { ImageThumb } from './ImageThumb';
export type Image = {
    readonly id?: number;
    src?: string;
    alt?: string | null;
    readonly photo?: string | null;
    readonly thumb?: ImageThumb;
    readonly metadata?: ImageMetadata;
    readonly dateCreated?: string;
    readonly dateUpdated?: string;
};

