/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Image } from '../models/Image';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ImageService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Retrieves the collection of Image resources.
     * Retrieves the collection of Image resources.
     * @returns Image Image collection
     * @throws ApiError
     */
    public apiImagesGetCollection({
        page = 1,
    }: {
        /**
         * The collection page number
         */
        page?: number,
    }): CancelablePromise<Array<Image>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/images',
            query: {
                'page': page,
            },
        });
    }
    /**
     * Creates a Image resource.
     * Creates a Image resource.
     * @returns Image Image resource created
     * @throws ApiError
     */
    public apiImagesPost({
        requestBody,
    }: {
        /**
         * The new Image resource
         */
        requestBody: Image,
    }): CancelablePromise<Image> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/images',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                422: `Unprocessable entity`,
            },
        });
    }
    /**
     * Retrieves a Image resource.
     * Retrieves a Image resource.
     * @returns Image Image resource
     * @throws ApiError
     */
    public apiImagesIdGet({
        id,
    }: {
        /**
         * Image identifier
         */
        id: string,
    }): CancelablePromise<Image> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/images/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Replaces the Image resource.
     * Replaces the Image resource.
     * @returns Image Image resource updated
     * @throws ApiError
     */
    public apiImagesIdPut({
        id,
        requestBody,
    }: {
        /**
         * Image identifier
         */
        id: string,
        /**
         * The updated Image resource
         */
        requestBody: Image,
    }): CancelablePromise<Image> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/images/{id}',
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
     * Removes the Image resource.
     * Removes the Image resource.
     * @returns void
     * @throws ApiError
     */
    public apiImagesIdDelete({
        id,
    }: {
        /**
         * Image identifier
         */
        id: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/images/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Updates the Image resource.
     * Updates the Image resource.
     * @returns Image Image resource updated
     * @throws ApiError
     */
    public apiImagesIdPatch({
        id,
        requestBody,
    }: {
        /**
         * Image identifier
         */
        id: string,
        /**
         * The updated Image resource
         */
        requestBody: Image,
    }): CancelablePromise<Image> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/images/{id}',
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
