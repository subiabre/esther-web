/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LogEntry_jsonld } from './LogEntry_jsonld';
/**
 * Someone who interacts with the API.
 */
export type User_jsonld = {
    readonly '@context'?: (string | Record<string, any>);
    readonly '@id'?: string;
    readonly '@type'?: string;
    readonly id?: number;
    /**
     * An email-compliant string identifying the User.
     */
    email: string;
    /**
     * A plain-text password that will be hashed by the API.
     */
    password?: string;
    /**
     * The user roles
     */
    roles?: Array<string>;
    /**
     * The Sessions created with this User's credentials.
     */
    readonly sessions?: Array<string>;
    readonly logEntries?: Array<LogEntry_jsonld>;
    readonly dateCreated?: string | null;
    readonly dateUpdated?: string | null;
    /**
     * A visual identifier that represents this user.
     */
    readonly userIdentifier?: string;
};

