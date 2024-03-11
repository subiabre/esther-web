/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhotoAddress } from './PhotoAddress';
import type { PhotoDateRange } from './PhotoDateRange';
import type { PhotoScope } from './PhotoScope';
export type Photo = {
    readonly id?: number;
    date: PhotoDateRange;
    address?: PhotoAddress;
    images: Array<string>;
    scopes?: Array<PhotoScope>;
    readonly dateCreated?: string;
    readonly dateUpdated?: string;
};

