/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageMetadata } from './ImageMetadata';
import type { ImageThumb } from './ImageThumb';
/**
 * Images exist in a 1:1 relation with an image file stored somewhere.
 */
export type Image = {
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
    readonly thumb?: ImageThumb;
    /**
     * ImageMetadata holds a mix of information sourced from an Image's file.
     */
    readonly metadata?: ImageMetadata;
    /**
     * The Photo to which this Image belongs.
     */
    readonly photo?: string | null;
    readonly dateCreated?: string;
    readonly dateUpdated?: string;
    readonly srcFilename?: string | null;
};

