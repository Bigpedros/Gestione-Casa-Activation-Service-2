import type { ValidationResult } from '../common/types.js';
import { type ContactRequestExchangeEnvelope } from './exchange.types.js';
/**
 * Creates a valid ContactRequestExchangeEnvelope from a contact request.
 */
export declare function createContactRequestExchangeEnvelope(request: unknown, exportedAt?: string): ValidationResult<ContactRequestExchangeEnvelope>;
/**
 * Validates an unknown input as a ContactRequestExchangeEnvelope.
 */
export declare function validateContactRequestExchangeEnvelope(input: unknown): ValidationResult<ContactRequestExchangeEnvelope>;
/**
 * Serializes an envelope to a formatted JSON string.
 */
export declare function serializeContactRequestExchangeEnvelope(input: unknown): ValidationResult<string>;
/**
 * Deserializes a JSON string into a validated ContactRequestExchangeEnvelope.
 */
export declare function deserializeContactRequestExchangeEnvelope(json: string): ValidationResult<ContactRequestExchangeEnvelope>;
/**
 * Builds the canonical filename for a contact request exchange envelope.
 * Format: gestione-casa-contact-request_<ID>_<YYYYMMDD-HHmmss>.json
 */
export declare function buildContactRequestExchangeFileName(input: unknown): ValidationResult<string>;
//# sourceMappingURL=exchange.d.ts.map