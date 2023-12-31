declare class Config {
    NODE_ENV: string | undefined;
    CLIENT_URL: string | undefined;
    SENDER_EMAIL: string | undefined;
    SENDER_EMAIL_PASSWORD: string | undefined;
    RABBITMQ_ENDPOINT: string | undefined;
    ELASTIC_SEARCH_URL: string | undefined;
    constructor();
}
export declare const config: Config;
export {};
