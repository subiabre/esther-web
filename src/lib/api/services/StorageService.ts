/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Storage } from '../models/Storage';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StorageService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Retrieves the collection of Storage resources.
     * Retrieves the collection of Storage resources.
     * @returns Storage Storage collection
     * @throws ApiError
     */
    public apiStoragesGetCollection({
        page = 1,
    }: {
        /**
         * The collection page number
         */
        page?: number,
    }): CancelablePromise<Array<Storage>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/storages',
            query: {
                'page': page,
            },
        });
    }
    /**
     * Updates the Storage resource.
     * Updates the Storage resource.
     * @returns Storage Storage resource updated
     * @throws ApiError
     */
    public apiStoragesNamePatch({
        name,
        requestBody,
    }: {
        /**
         * Storage identifier
         */
        name: string,
        /**
         * The updated Storage resource
         */
        requestBody: Storage,
    }): CancelablePromise<Storage> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/storages/{name}',
            path: {
                'name': name,
            },
            body: requestBody,
            mediaType: 'application/merge-patch+json',
            errors: {
                400: `Invalid input`,
                404: `Resource not found`,
                422: `Unprocessable entity`,
            },
        });
    }
}
