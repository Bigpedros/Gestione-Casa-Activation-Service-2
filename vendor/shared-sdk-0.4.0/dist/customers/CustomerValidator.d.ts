import type { ValidationResult } from '../common/types.js';
import { type CustomerDocument } from './types.js';
export declare class CustomerValidator {
    /**
     * Normalizes input data for CustomerDocument.
     */
    static normalize(input: Partial<CustomerDocument>): CustomerDocument;
    /**
     * Validates a CustomerDocument or partial input.
     */
    static validate(input: unknown): ValidationResult<CustomerDocument>;
    /**
     * Fast boolean check for CustomerDocument validity.
     */
    static isValid(input: unknown): boolean;
}
//# sourceMappingURL=CustomerValidator.d.ts.map