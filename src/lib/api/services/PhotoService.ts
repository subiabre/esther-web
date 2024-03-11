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
     * @param page The collection page number
     * @param dateOrder
     * @param dateRangeMin Only display items after this date
     * @param dateRangeMax Only display items before this date
     * @param addressComponents Filter collection by address components key-value pairs.
     * @param imagesAlt
     * @returns Photo Photo collection
     * @throws ApiError
     */
    public apiPhotosGetCollection(
        page: number = 1,
        dateOrder?: 'asc' | 'desc',
        dateRangeMin?: string,
        dateRangeMax?: string,
        addressComponents?: string,
        imagesAlt?: string,
    ): CancelablePromise<Array<Photo>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/photos',
            query: {
                'page': page,
                'date[order]': dateOrder,
                'date[range:min]': dateRangeMin,
                'date[range:max]': dateRangeMax,
                'address[components]': addressComponents,
                'images.alt': imagesAlt,
            },
        });
    }
    /**
     * Creates a Photo resource.
     * Creates a Photo resource.
     * @param requestBody The new Photo resource
     * @returns Photo Photo resource created
     * @throws ApiError
     */
    public apiPhotosPost(
        requestBody: Photo,
    ): CancelablePromise<Photo> {
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
     * @param id Photo identifier
     * @returns Photo Photo resource
     * @throws ApiError
     */
    public apiPhotosIdGet(
        id: string,
    ): CancelablePromise<Photo> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/photos/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Replaces the Photo resource.
     * Replaces the Photo resource.
     * @param id Photo identifier
     * @param requestBody The updated Photo resource
     * @returns Photo Photo resource updated
     * @throws ApiError
     */
    public apiPhotosIdPut(
        id: string,
        requestBody: Photo,
    ): CancelablePromise<Photo> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/photos/{id}',
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
     * Removes the Photo resource.
     * Removes the Photo resource.
     * @param id Photo identifier
     * @returns void
     * @throws ApiError
     */
    public apiPhotosIdDelete(
        id: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/photos/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Updates the Photo resource.
     * Updates the Photo resource.
     * @param id Photo identifier
     * @param requestBody The updated Photo resource
     * @returns Photo Photo resource updated
     * @throws ApiError
     */
    public apiPhotosIdPatch(
        id: string,
        requestBody: Photo,
    ): CancelablePromise<Photo> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/photos/{id}',
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
