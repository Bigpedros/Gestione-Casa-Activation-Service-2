import type { ClientLicenseSnapshot, LicenseEvaluationResult, LicenseTerm } from './types.js';
export declare function calculateExpirationDate(activatedAt: string, term: LicenseTerm): string | null;
export declare function calculateRemainingDays(expiresAt: string | null, now?: Date): number | null;
export declare function evaluateLicense(snapshot: ClientLicenseSnapshot, now?: Date): LicenseEvaluationResult;
//# sourceMappingURL=lifecycle.d.ts.map