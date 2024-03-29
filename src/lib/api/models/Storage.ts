/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Storages hold configuration necessary for the API to operate with an external storage service.
 */
export type Storage = {
    /**
     * Represents the underlying storage service.
     */
    name?: string;
    /**
     * A collection of key-value pairs for the Storage configuration options.
     */
    config?: Array<string>;
};

