import type { ContactRequestDocument } from './types.js';
export declare const CONTACT_REQUEST_EXCHANGE_FORMAT: "gestione-casa-contact-request";
export declare const CONTACT_REQUEST_EXCHANGE_FORMAT_VERSION: 1;
export type ContactRequestExchangeFormat = typeof CONTACT_REQUEST_EXCHANGE_FORMAT;
export type ContactRequestExchangeFormatVersion = typeof CONTACT_REQUEST_EXCHANGE_FORMAT_VERSION;
export interface ContactRequestExchangeEnvelope {
    format: ContactRequestExchangeFormat;
    formatVersion: ContactRequestExchangeFormatVersion;
    exportedAt: string;
    request: ContactRequestDocument;
}
//# sourceMappingURL=exchange.types.d.ts.map