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
    public apiImageIdportraitsGetCollection({
        id,
        page = 1,
    }: {
        /**
         * Image identifier
         */
        id: string,
        /**
         * The collection page number
         */
        page?: number,
    }): CancelablePromise<Array<Portrait>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/image/{id}/portraits',
            path: {
                'id': id,
            },
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
    public apiImageIdportraitsPost({
        id,
        requestBody,
    }: {
        /**
         * Image identifier
         */
        id: string,
        /**
         * The new Portrait resource
         */
        requestBody: Portrait,
    }): CancelablePromise<Portrait> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/image/{id}/portraits',
            path: {
                'id': id,
            },
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
    public apiImageIdportraitsPortraitIdGet({
        id,
        portraitId,
    }: {
        /**
         * Image identifier
         */
        id: string,
        /**
         * Portrait identifier
         */
        portraitId: string,
    }): CancelablePromise<Portrait> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/image/{id}/portraits/{portraitId}',
            path: {
                'id': id,
                'portraitId': portraitId,
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
    public apiImageIdportraitsPortraitIdPut({
        id,
        portraitId,
        requestBody,
    }: {
        /**
         * Image identifier
         */
        id: string,
        /**
         * Portrait identifier
         */
        portraitId: string,
        /**
         * The updated Portrait resource
         */
        requestBody: Portrait,
    }): CancelablePromise<Portrait> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/image/{id}/portraits/{portraitId}',
            path: {
                'id': id,
                'portraitId': portraitId,
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
    public apiImageIdportraitsPortraitIdDelete({
        id,
        portraitId,
    }: {
        /**
         * Image identifier
         */
        id: string,
        /**
         * Portrait identifier
         */
        portraitId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/image/{id}/portraits/{portraitId}',
            path: {
                'id': id,
                'portraitId': portraitId,
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
    public apiImageIdportraitsPortraitIdPatch({
        id,
        portraitId,
        requestBody,
    }: {
        /**
         * Image identifier
         */
        id: string,
        /**
         * Portrait identifier
         */
        portraitId: string,
        /**
         * The updated Portrait resource
         */
        requestBody: Portrait,
    }): CancelablePromise<Portrait> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/image/{id}/portraits/{portraitId}',
            path: {
                'id': id,
                'portraitId': portraitId,
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
