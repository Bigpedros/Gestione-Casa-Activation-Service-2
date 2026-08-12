import type { ValidationResult } from '../common/types.js';
import type { ActivationRequestEnvelope, ActivationResponseEnvelope, LicenseDeactivationRequestEnvelope, LicenseDeactivationResponseEnvelope, LicenseValidationRequestEnvelope, LicenseValidationResponseEnvelope, SignedLicenseDocument } from './types.js';
export declare function serializeActivationRequestEnvelope(input: unknown): ValidationResult<string>;
export declare function deserializeActivationRequestEnvelope(json: string): ValidationResult<ActivationRequestEnvelope>;
export declare function serializeActivationResponseEnvelope(input: unknown): ValidationResult<string>;
export declare function deserializeActivationResponseEnvelope(json: string): ValidationResult<ActivationResponseEnvelope>;
export declare function serializeLicenseValidationRequestEnvelope(input: unknown): ValidationResult<string>;
export declare function deserializeLicenseValidationRequestEnvelope(json: string): ValidationResult<LicenseValidationRequestEnvelope>;
export declare function serializeLicenseValidationResponseEnvelope(input: unknown): ValidationResult<string>;
export declare function deserializeLicenseValidationResponseEnvelope(json: string): ValidationResult<LicenseValidationResponseEnvelope>;
export declare function serializeLicenseDeactivationRequestEnvelope(input: unknown): ValidationResult<string>;
export declare function deserializeLicenseDeactivationRequestEnvelope(json: string): ValidationResult<LicenseDeactivationRequestEnvelope>;
export declare function serializeLicenseDeactivationResponseEnvelope(input: unknown): ValidationResult<string>;
export declare function deserializeLicenseDeactivationResponseEnvelope(json: string): ValidationResult<LicenseDeactivationResponseEnvelope>;
export declare function serializeSignedLicenseDocument(input: unknown): ValidationResult<string>;
export declare function deserializeSignedLicenseDocument(json: string): ValidationResult<SignedLicenseDocument>;
//# sourceMappingURL=serialization.d.ts.map