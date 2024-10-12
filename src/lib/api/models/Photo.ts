/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhotoAddress } from './PhotoAddress';
import type { PhotoDateRange } from './PhotoDateRange';
/**
 * Photos are displayable, filterable and sortable collections of related Images.
 * e.g. Digital scans of the two sides of an analogic photo.
 */
export type Photo = {
    readonly id?: number;
    /**
     * Photos are dated approximately between a range of dates.
     */
    date: PhotoDateRange;
    /**
     * A breakdown of the address and the different components of the Photo's location.
     */
    address?: PhotoAddress;
    images: Array<string>;
    roles?: Array<string>;
    readonly dateCreated?: string | null;
    readonly dateUpdated?: string | null;
};

