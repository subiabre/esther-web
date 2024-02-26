/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UserService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Retrieves the collection of User resources.
     * Retrieves the collection of User resources.
     * @param page The collection page number
     * @returns User User collection
     * @throws ApiError
     */
    public apiUsersGetCollection(
        page: number = 1,
    ): CancelablePromise<Array<User>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/users',
            query: {
                'page': page,
            },
        });
    }
    /**
     * Creates a User resource.
     * Creates a User resource.
     * @param requestBody The new User resource
     * @returns User User resource created
     * @throws ApiError
     */
    public apiUsersPost(
        requestBody: User,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                422: `Unprocessable entity`,
            },
        });
    }
    /**
     * Retrieves a User resource.
     * Retrieves a User resource.
     * @param id User identifier
     * @returns User User resource
     * @throws ApiError
     */
    public apiUsersIdGet(
        id: string,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Replaces the User resource.
     * Replaces the User resource.
     * @param id User identifier
     * @param requestBody The updated User resource
     * @returns User User resource updated
     * @throws ApiError
     */
    public apiUsersIdPut(
        id: string,
        requestBody: User,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/v1/users/{id}',
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
     * Removes the User resource.
     * Removes the User resource.
     * @param id User identifier
     * @returns void
     * @throws ApiError
     */
    public apiUsersIdDelete(
        id: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Updates the User resource.
     * Updates the User resource.
     * @param id User identifier
     * @param requestBody The updated User resource
     * @returns User User resource updated
     * @throws ApiError
     */
    public apiUsersIdPatch(
        id: string,
        requestBody: User,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/v1/users/{id}',
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
