import type { LicenseParseResult } from './types.js';
export declare class LicenseValidator {
    static normalize(input: string): string;
    static validateFormat(code: string): boolean;
    static calculateChecksumChar(base15: string): string;
    static validateChecksum(code: string): boolean;
    static parse(input: string): LicenseParseResult;
    static isValid(input: string): boolean;
}
//# sourceMappingURL=LicenseValidator.d.ts.map