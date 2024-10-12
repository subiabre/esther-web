/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhotoAddress_jsonld } from './PhotoAddress_jsonld';
import type { PhotoDateRange_jsonld } from './PhotoDateRange_jsonld';
/**
 * Photos are displayable, filterable and sortable collections of related Images.
 * e.g. Digital scans of the two sides of an analogic photo.
 */
export type Photo_jsonld = {
    readonly '@context'?: (string | Record<string, any>);
    readonly '@id'?: string;
    readonly '@type'?: string;
    readonly id?: number;
    /**
     * Photos are dated approximately between a range of dates.
     */
    date: PhotoDateRange_jsonld;
    /**
     * A breakdown of the address and the different components of the Photo's location.
     */
    address?: PhotoAddress_jsonld;
    images: Array<string>;
    roles?: Array<string>;
    readonly dateCreated?: string | null;
    readonly dateUpdated?: string | null;
};

