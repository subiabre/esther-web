/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type User = {
    readonly id?: number;
    email: string;
    password?: string;
    /**
     * The user roles
     */
    roles?: Array<string>;
    readonly sessions?: Array<string>;
    readonly dateCreated?: string;
    readonly dateUpdated?: string;
    /**
     * A visual identifier that represents this user.
     */
    readonly userIdentifier?: string;
};

