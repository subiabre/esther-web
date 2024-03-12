/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Session } from '../models/Session';
import type { Session_SessionAuthenticationDto } from '../models/Session_SessionAuthenticationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SessionService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Creates a Session resource.
     * Creates a Session resource.
     * @returns Session Session resource created
     * @throws ApiError
     */
    public apiSessionsPost({
        requestBody,
    }: {
        /**
         * The new Session resource
         */
        requestBody: Session_SessionAuthenticationDto,
    }): CancelablePromise<Session> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/sessions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                422: `Unprocessable entity`,
            },
        });
    }
    /**
     * Retrieves a Session resource.
     * Retrieves a Session resource.
     * @returns Session Session resource
     * @throws ApiError
     */
    public apiSessionsIdGet({
        id,
    }: {
        /**
         * Session identifier
         */
        id: string,
    }): CancelablePromise<Session> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/sessions/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Removes the Session resource.
     * Removes the Session resource.
     * @returns void
     * @throws ApiError
     */
    public apiSessionsIdDelete({
        id,
    }: {
        /**
         * Session identifier
         */
        id: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/v1/sessions/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
}
