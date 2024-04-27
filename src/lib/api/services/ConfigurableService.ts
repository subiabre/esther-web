/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Configurable } from '../models/Configurable';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ConfigurableService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Retrieves the collection of Configurable resources.
     * Retrieves the collection of Configurable resources.
     * @returns Configurable Configurable collection
     * @throws ApiError
     */
    public apiConfigurablesGetCollection({
        page = 1,
    }: {
        /**
         * The collection page number
         */
        page?: number,
    }): CancelablePromise<Array<Configurable>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/configurables',
            query: {
                'page': page,
            },
        });
    }
    /**
     * Updates the Configurable resource.
     * Updates the Configurable resource.
     * @returns Configurable Configurable resource updated
     * @throws ApiError
     */
    public apiConfigurablesNamePatch({
        name,
        requestBody,
    }: {
        /**
         * Configurable identifier
         */
        name: string,
        /**
         * The updated Configurable resource
         */
        requestBody: Configurable,
    }): CancelablePromise<Configurable> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/configurables/{name}',
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
