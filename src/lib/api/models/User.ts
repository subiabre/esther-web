/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LogEntry } from './LogEntry';
/**
 * Someone who interacts with the API.
 */
export type User = {
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
    readonly logEntries?: Array<LogEntry>;
    readonly dateCreated?: string | null;
    readonly dateUpdated?: string | null;
    /**
     * A visual identifier that represents this user.
     */
    readonly userIdentifier?: string;
};

