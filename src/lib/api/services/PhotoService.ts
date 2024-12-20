/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Photo } from '../models/Photo';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PhotoService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Retrieves the collection of Photo resources.
     * Retrieves the collection of Photo resources.
     * @returns Photo Photo collection
     * @throws ApiError
     */
    public apiPhotosGetCollection({
        page = 1,
        dateOrder,
        dateRangeMin,
        dateRangeMax,
        addressKnown,
        addressComponentsArray,
        imagesAlt,
        imagesPortraitsPerson,
        imagesPortraitsPersonArray,
    }: {
        /**
         * The collection page number
         */
        page?: number,
        dateOrder?: 'asc' | 'desc',
        /**
         * Only display items after this date
         */
        dateRangeMin?: string,
        /**
         * Only display items before this date
         */
        dateRangeMax?: string,
        /**
         * Filter collection by known/unknown addresses.
         */
        addressKnown?: boolean,
        /**
         * Filter collection by address components key-value pairs.
         */
        addressComponentsArray?: Array<string>,
        imagesAlt?: string,
        imagesPortraitsPerson?: string,
        imagesPortraitsPersonArray?: Array<string>,
    }): CancelablePromise<Array<Photo>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/photos',
            query: {
                'page': page,
                'date[order]': dateOrder,
                'date[range.min]': dateRangeMin,
                'date[range.max]': dateRangeMax,
                'address[known]': addressKnown,
                'address[components][]': addressComponentsArray,
                'images.alt': imagesAlt,
                'images.portraits.person': imagesPortraitsPerson,
                'images.portraits.person[]': imagesPortraitsPersonArray,
            },
        });
    }
    /**
     * Creates a Photo resource.
     * Creates a Photo resource.
     * @returns Photo Photo resource created
     * @throws ApiError
     */
    public apiPhotosPost({
        requestBody,
    }: {
        /**
         * The new Photo resource
         */
        requestBody: Photo,
    }): CancelablePromise<Photo> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/photos',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                422: `Unprocessable entity`,
            },
        });
    }
    /**
     * Retrieves a Photo resource.
     * Retrieves a Photo resource.
     * @returns Photo Photo resource
     * @throws ApiError
     */
    public apiPhotosCodeGet({
        code,
    }: {
        /**
         * Photo identifier
         */
        code: string,
    }): CancelablePromise<Photo> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/photos/{code}',
            path: {
                'code': code,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Replaces the Photo resource.
     * Replaces the Photo resource.
     * @returns Photo Photo resource updated
     * @throws ApiError
     */
    public apiPhotosCodePut({
        code,
        requestBody,
    }: {
        /**
         * Photo identifier
         */
        code: string,
        /**
         * The updated Photo resource
         */
        requestBody: Photo,
    }): CancelablePromise<Photo> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/photos/{code}',
            path: {
                'code': code,
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
     * Removes the Photo resource.
     * Removes the Photo resource.
     * @returns void
     * @throws ApiError
     */
    public apiPhotosCodeDelete({
        code,
    }: {
        /**
         * Photo identifier
         */
        code: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/photos/{code}',
            path: {
                'code': code,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Updates the Photo resource.
     * Updates the Photo resource.
     * @returns Photo Photo resource updated
     * @throws ApiError
     */
    public apiPhotosCodePatch({
        code,
        requestBody,
    }: {
        /**
         * Photo identifier
         */
        code: string,
        /**
         * The updated Photo resource
         */
        requestBody: Photo,
    }): CancelablePromise<Photo> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/photos/{code}',
            path: {
                'code': code,
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
