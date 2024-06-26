/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Portrait } from '../models/Portrait';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PortraitService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Retrieves the collection of Portrait resources.
     * Retrieves the collection of Portrait resources.
     * @returns Portrait Portrait collection
     * @throws ApiError
     */
    public apiPortraitsGetCollection({
        page = 1,
    }: {
        /**
         * The collection page number
         */
        page?: number,
    }): CancelablePromise<Array<Portrait>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/portraits',
            query: {
                'page': page,
            },
        });
    }
    /**
     * Creates a Portrait resource.
     * Creates a Portrait resource.
     * @returns Portrait Portrait resource created
     * @throws ApiError
     */
    public apiPortraitsPost({
        requestBody,
    }: {
        /**
         * The new Portrait resource
         */
        requestBody: Portrait,
    }): CancelablePromise<Portrait> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/portraits',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                422: `Unprocessable entity`,
            },
        });
    }
    /**
     * Retrieves a Portrait resource.
     * Retrieves a Portrait resource.
     * @returns Portrait Portrait resource
     * @throws ApiError
     */
    public apiPortraitsIdGet({
        id,
    }: {
        /**
         * Portrait identifier
         */
        id: string,
    }): CancelablePromise<Portrait> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/portraits/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Replaces the Portrait resource.
     * Replaces the Portrait resource.
     * @returns Portrait Portrait resource updated
     * @throws ApiError
     */
    public apiPortraitsIdPut({
        id,
        requestBody,
    }: {
        /**
         * Portrait identifier
         */
        id: string,
        /**
         * The updated Portrait resource
         */
        requestBody: Portrait,
    }): CancelablePromise<Portrait> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/portraits/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                404: `Resource not found`,
                422: `Unprocessable entity`,
            },
        });
    }
    /**
     * Removes the Portrait resource.
     * Removes the Portrait resource.
     * @returns void
     * @throws ApiError
     */
    public apiPortraitsIdDelete({
        id,
    }: {
        /**
         * Portrait identifier
         */
        id: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/portraits/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Updates the Portrait resource.
     * Updates the Portrait resource.
     * @returns Portrait Portrait resource updated
     * @throws ApiError
     */
    public apiPortraitsIdPatch({
        id,
        requestBody,
    }: {
        /**
         * Portrait identifier
         */
        id: string,
        /**
         * The updated Portrait resource
         */
        requestBody: Portrait,
    }): CancelablePromise<Portrait> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/portraits/{id}',
            path: {
                'id': id,
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
