/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Person } from '../models/Person';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PersonService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Retrieves the collection of Person resources.
     * Retrieves the collection of Person resources.
     * @returns Person Person collection
     * @throws ApiError
     */
    public apiPeopleGetCollection({
        page = 1,
        name,
    }: {
        /**
         * The collection page number
         */
        page?: number,
        name?: string,
    }): CancelablePromise<Array<Person>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/people',
            query: {
                'page': page,
                'name': name,
            },
        });
    }
    /**
     * Creates a Person resource.
     * Creates a Person resource.
     * @returns Person Person resource created
     * @throws ApiError
     */
    public apiPeoplePost({
        requestBody,
    }: {
        /**
         * The new Person resource
         */
        requestBody: Person,
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/people',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                422: `Unprocessable entity`,
            },
        });
    }
    /**
     * Retrieves a Person resource.
     * Retrieves a Person resource.
     * @returns Person Person resource
     * @throws ApiError
     */
    public apiPeopleIdGet({
        id,
    }: {
        /**
         * Person identifier
         */
        id: string,
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/people/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Replaces the Person resource.
     * Replaces the Person resource.
     * @returns Person Person resource updated
     * @throws ApiError
     */
    public apiPeopleIdPut({
        id,
        requestBody,
    }: {
        /**
         * Person identifier
         */
        id: string,
        /**
         * The updated Person resource
         */
        requestBody: Person,
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/people/{id}',
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
     * Removes the Person resource.
     * Removes the Person resource.
     * @returns void
     * @throws ApiError
     */
    public apiPeopleIdDelete({
        id,
    }: {
        /**
         * Person identifier
         */
        id: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/people/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Updates the Person resource.
     * Updates the Person resource.
     * @returns Person Person resource updated
     * @throws ApiError
     */
    public apiPeopleIdPatch({
        id,
        requestBody,
    }: {
        /**
         * Person identifier
         */
        id: string,
        /**
         * The updated Person resource
         */
        requestBody: Person,
    }): CancelablePromise<Person> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/people/{id}',
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
