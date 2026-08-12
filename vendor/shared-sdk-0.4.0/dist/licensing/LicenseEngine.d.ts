import type { LicenseCodeRandomSource } from './types.js';
export declare class LicenseEngine {
    static generateCode(randomSource?: LicenseCodeRandomSource): string;
    static generateUniqueCode(codeExists: (code: string) => Promise<boolean>, maxRetries?: number, randomSource?: LicenseCodeRandomSource): Promise<string>;
}
//# sourceMappingURL=LicenseEngine.d.ts.map