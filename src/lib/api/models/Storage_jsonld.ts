/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Storages hold configuration necessary for the API to operate with an external storage service.
 */
export type Storage_jsonld = {
    readonly '@context'?: (string | Record<string, any>);
    readonly '@id'?: string;
    readonly '@type'?: string;
    /**
     * Represents the underlying storage service.
     */
    name?: string;
    /**
     * A collection of key-value pairs for the Storage configuration options.
     */
    config?: Array<string>;
};

