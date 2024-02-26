/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhotoDateRange } from './PhotoDateRange';
import type { PhotoScope } from './PhotoScope';
export type Photo = {
    readonly id?: number;
    images: Array<string>;
    date: PhotoDateRange;
    scopes?: Array<PhotoScope>;
    readonly dateCreated?: string;
    readonly dateUpdated?: string;
};

