/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhotoDateRange_jsonld } from './PhotoDateRange_jsonld';
import type { PhotoScope_jsonld } from './PhotoScope_jsonld';
export type Photo_jsonld = {
    readonly '@context'?: (string | Record<string, any>);
    readonly '@id'?: string;
    readonly '@type'?: string;
    readonly id?: number;
    images: Array<string>;
    date: PhotoDateRange_jsonld;
    scopes?: Array<PhotoScope_jsonld>;
    readonly dateCreated?: string;
    readonly dateUpdated?: string;
};

