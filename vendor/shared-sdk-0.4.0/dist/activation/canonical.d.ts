import type { LicenseDocument } from '../licensing/types.js';
/**
 * Builds the canonical payload v1 for a license document.
 * Guarantees exact deterministic JSON output matching License Manager 2.6.A.
 */
export declare function buildCanonicalLicensePayloadV1(license: LicenseDocument): string;
//# sourceMappingURL=canonical.d.ts.map