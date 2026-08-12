import type { ValidationResult } from '../common/types.js';
import { type ContactRequestDocument } from './types.js';
export declare class ContactRequestValidator {
    /**
     * Normalizes input data for ContactRequestDocument.
     */
    static normalize(input: Partial<ContactRequestDocument>): ContactRequestDocument;
    /**
     * Validates a ContactRequestDocument or partial input.
     */
    static validate(input: unknown): ValidationResult<ContactRequestDocument>;
    /**
     * Fast boolean check for ContactRequestDocument validity.
     */
    static isValid(input: unknown): boolean;
}
//# sourceMappingURL=ContactRequestValidator.d.ts.map