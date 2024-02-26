/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionRequest_jsonld } from './SessionRequest_jsonld';
export type Session_jsonld = {
    readonly '@context'?: (string | Record<string, any>);
    readonly '@id'?: string;
    readonly '@type'?: string;
    readonly id?: number;
    user?: string;
    token?: string;
    request?: SessionRequest_jsonld;
    readonly dateCreated?: string;
};

