/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { ConfigurableService } from './services/ConfigurableService';
import { ImageService } from './services/ImageService';
import { PersonService } from './services/PersonService';
import { PhotoService } from './services/PhotoService';
import { PortraitService } from './services/PortraitService';
import { SessionService } from './services/SessionService';
import { StorageService } from './services/StorageService';
import { UserService } from './services/UserService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class ApiClient {
    public readonly configurable: ConfigurableService;
    public readonly image: ImageService;
    public readonly person: PersonService;
    public readonly photo: PhotoService;
    public readonly portrait: PortraitService;
    public readonly session: SessionService;
    public readonly storage: StorageService;
    public readonly user: UserService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.configurable = new ConfigurableService(this.request);
        this.image = new ImageService(this.request);
        this.person = new PersonService(this.request);
        this.photo = new PhotoService(this.request);
        this.portrait = new PortraitService(this.request);
        this.session = new SessionService(this.request);
        this.storage = new StorageService(this.request);
        this.user = new UserService(this.request);
    }
}

