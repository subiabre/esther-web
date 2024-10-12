/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageMetadata_jsonld } from './ImageMetadata_jsonld';
import type { ImageThumb_jsonld } from './ImageThumb_jsonld';
import type { Portrait_jsonld } from './Portrait_jsonld';
/**
 * Images exist in a 1:1 relation with an image file stored somewhere.
 */
export type Image_jsonld = {
    readonly '@context'?: (string | Record<string, any>);
    readonly '@id'?: string;
    readonly '@type'?: string;
    readonly id?: number;
    /**
     * Fully qualified path to the file.
     */
    src: string;
    /**
     * A descriptive text of the image,
     * also used as the alternative text for the (non) displayed image.
     */
    alt?: string | null;
    /**
     * A downscaled version of the Image's file, stored elsewhere.
     */
    readonly thumb?: ImageThumb_jsonld;
    portraits?: Array<Portrait_jsonld>;
    /**
     * ImageMetadata holds a mix of information sourced from an Image's file.
     */
    readonly metadata?: ImageMetadata_jsonld;
    /**
     * The Photo to which this Image belongs.
     */
    readonly photo?: string | null;
    readonly dateCreated?: string | null;
    readonly dateUpdated?: string | null;
    readonly srcFilename?: string | null;
};

