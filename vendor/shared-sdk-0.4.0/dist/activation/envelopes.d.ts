import type { ValidationResult } from '../common/types.js';
import { type ActivationRequestEnvelope, type ActivationResponseEnvelope, type LicenseDeactivationRequestEnvelope, type LicenseDeactivationResponseEnvelope, type LicenseValidationRequestEnvelope, type LicenseValidationResponseEnvelope } from './types.js';
export declare function createActivationRequestEnvelope(requestInput: unknown, requestId?: string, createdAt?: string): ValidationResult<ActivationRequestEnvelope>;
export declare function validateActivationRequestEnvelope(input: unknown): ValidationResult<ActivationRequestEnvelope>;
export declare function createActivationResponseEnvelope(responseInput: unknown, requestId?: string, createdAt?: string): ValidationResult<ActivationResponseEnvelope>;
export declare function validateActivationResponseEnvelope(input: unknown): ValidationResult<ActivationResponseEnvelope>;
export declare function createLicenseValidationRequestEnvelope(requestInput: unknown, requestId?: string, createdAt?: string): ValidationResult<LicenseValidationRequestEnvelope>;
export declare function validateLicenseValidationRequestEnvelope(input: unknown): ValidationResult<LicenseValidationRequestEnvelope>;
export declare function createLicenseValidationResponseEnvelope(responseInput: unknown, requestId?: string, createdAt?: string): ValidationResult<LicenseValidationResponseEnvelope>;
export declare function validateLicenseValidationResponseEnvelope(input: unknown): ValidationResult<LicenseValidationResponseEnvelope>;
export declare function createLicenseDeactivationRequestEnvelope(requestInput: unknown, requestId?: string, createdAt?: string): ValidationResult<LicenseDeactivationRequestEnvelope>;
export declare function validateLicenseDeactivationRequestEnvelope(input: unknown): ValidationResult<LicenseDeactivationRequestEnvelope>;
export declare function createLicenseDeactivationResponseEnvelope(responseInput: unknown, requestId?: string, createdAt?: string): ValidationResult<LicenseDeactivationResponseEnvelope>;
export declare function validateLicenseDeactivationResponseEnvelope(input: unknown): ValidationResult<LicenseDeactivationResponseEnvelope>;
//# sourceMappingURL=envelopes.d.ts.map