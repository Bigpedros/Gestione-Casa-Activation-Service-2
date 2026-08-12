import type { ValidationIssue, ValidationResult } from '../common/types.js';
import type { ActivationRequest, ActivationResponse, LicenseDeactivationRequest, LicenseDeactivationResponse, LicenseValidationRequest, LicenseValidationResponse, SignedLicenseDocument } from './types.js';
export declare class ActivationValidator {
    /**
     * Validates deviceId string.
     */
    static validateDeviceId(deviceId: unknown): ValidationIssue[];
    /**
     * Validates productId string.
     */
    static validateProductId(productId: unknown): ValidationIssue[];
    /**
     * Validates a SignedLicenseDocument structure.
     */
    static validateSignedLicenseDocument(input: unknown): ValidationResult<SignedLicenseDocument>;
    /**
     * Validates an ActivationRequest object from client.
     */
    static validateActivationRequest(input: unknown): ValidationResult<ActivationRequest>;
    /**
     * Validates an ActivationResponse object.
     */
    static validateActivationResponse(input: unknown): ValidationResult<ActivationResponse>;
    /**
     * Validates a LicenseValidationRequest object.
     */
    static validateLicenseValidationRequest(input: unknown): ValidationResult<LicenseValidationRequest>;
    /**
     * Validates a LicenseValidationResponse object.
     */
    static validateLicenseValidationResponse(input: unknown): ValidationResult<LicenseValidationResponse>;
    /**
     * Validates a LicenseDeactivationRequest object.
     */
    static validateLicenseDeactivationRequest(input: unknown): ValidationResult<LicenseDeactivationRequest>;
    /**
     * Validates a LicenseDeactivationResponse object.
     */
    static validateLicenseDeactivationResponse(input: unknown): ValidationResult<LicenseDeactivationResponse>;
}
//# sourceMappingURL=validators.d.ts.map