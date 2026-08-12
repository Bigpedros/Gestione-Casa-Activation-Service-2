import { isValidIsoDate } from '../common/utils.js';
import { ActivationValidator } from './validators.js';
import { ACTIVATION_FORMAT_VERSION, ACTIVATION_REQUEST_FORMAT, ACTIVATION_RESPONSE_FORMAT, DEACTIVATION_REQUEST_FORMAT, DEACTIVATION_RESPONSE_FORMAT, VALIDATION_REQUEST_FORMAT, VALIDATION_RESPONSE_FORMAT, } from './types.js';
// Helper to generate simple fallback UUID if non-browser/crypto random is used
function generateRequestId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}
// --- Activation Request Envelope ---
export function createActivationRequestEnvelope(requestInput, requestId, createdAt) {
    const reqVal = ActivationValidator.validateActivationRequest(requestInput);
    if (!reqVal.isValid || !reqVal.value) {
        return { isValid: false, value: null, issues: reqVal.issues };
    }
    const finalRequestId = requestId && requestId.trim().length > 0 ? requestId.trim() : generateRequestId();
    const finalCreatedAt = createdAt || new Date().toISOString();
    if (!isValidIsoDate(finalCreatedAt)) {
        return {
            isValid: false,
            value: null,
            issues: [
                {
                    field: 'createdAt',
                    code: 'INVALID_FORMAT',
                    message: 'createdAt deve essere una data ISO 8601 valida',
                },
            ],
        };
    }
    return {
        isValid: true,
        value: {
            format: ACTIVATION_REQUEST_FORMAT,
            formatVersion: ACTIVATION_FORMAT_VERSION,
            requestId: finalRequestId,
            createdAt: finalCreatedAt,
            request: reqVal.value,
        },
        issues: [],
    };
}
export function validateActivationRequestEnvelope(input) {
    const issues = [];
    if (!input || typeof input !== 'object') {
        return {
            isValid: false,
            value: null,
            issues: [{ field: 'envelope', code: 'INVALID_FORMAT', message: 'L\'envelope deve essere un oggetto non nullo' }],
        };
    }
    const raw = input;
    if (raw.format !== ACTIVATION_REQUEST_FORMAT) {
        issues.push({
            field: 'format',
            code: 'INVALID_FORMAT',
            message: `Formato non valido: atteso "${ACTIVATION_REQUEST_FORMAT}"`,
        });
    }
    if (raw.formatVersion !== ACTIVATION_FORMAT_VERSION) {
        issues.push({
            field: 'formatVersion',
            code: 'UNSUPPORTED_VERSION',
            message: `Versione formato non supportata: attesa ${ACTIVATION_FORMAT_VERSION}`,
        });
    }
    if (typeof raw.requestId !== 'string' || raw.requestId.trim().length === 0) {
        issues.push({
            field: 'requestId',
            code: 'INVALID_FORMAT',
            message: 'requestId deve essere una stringa non vuota',
        });
    }
    if (typeof raw.createdAt !== 'string' || !isValidIsoDate(raw.createdAt)) {
        issues.push({
            field: 'createdAt',
            code: 'INVALID_FORMAT',
            message: 'createdAt deve essere una data ISO 8601 valida',
        });
    }
    const reqVal = ActivationValidator.validateActivationRequest(raw.request);
    if (!reqVal.isValid) {
        for (const issue of reqVal.issues) {
            issues.push({
                field: `request.${issue.field}`,
                code: issue.code,
                message: issue.message,
            });
        }
    }
    if (issues.length > 0) {
        return { isValid: false, value: null, issues };
    }
    return {
        isValid: true,
        value: {
            format: ACTIVATION_REQUEST_FORMAT,
            formatVersion: ACTIVATION_FORMAT_VERSION,
            requestId: raw.requestId.trim(),
            createdAt: raw.createdAt,
            request: reqVal.value,
        },
        issues: [],
    };
}
// --- Activation Response Envelope ---
export function createActivationResponseEnvelope(responseInput, requestId, createdAt) {
    const resVal = ActivationValidator.validateActivationResponse(responseInput);
    if (!resVal.isValid || !resVal.value) {
        return { isValid: false, value: null, issues: resVal.issues };
    }
    const finalRequestId = requestId && requestId.trim().length > 0 ? requestId.trim() : resVal.value.requestId;
    const finalCreatedAt = createdAt || new Date().toISOString();
    if (!isValidIsoDate(finalCreatedAt)) {
        return {
            isValid: false,
            value: null,
            issues: [{ field: 'createdAt', code: 'INVALID_FORMAT', message: 'createdAt deve essere una data ISO 8601 valida' }],
        };
    }
    return {
        isValid: true,
        value: {
            format: ACTIVATION_RESPONSE_FORMAT,
            formatVersion: ACTIVATION_FORMAT_VERSION,
            requestId: finalRequestId,
            createdAt: finalCreatedAt,
            response: resVal.value,
        },
        issues: [],
    };
}
export function validateActivationResponseEnvelope(input) {
    const issues = [];
    if (!input || typeof input !== 'object') {
        return {
            isValid: false,
            value: null,
            issues: [{ field: 'envelope', code: 'INVALID_FORMAT', message: 'L\'envelope deve essere un oggetto non nullo' }],
        };
    }
    const raw = input;
    if (raw.format !== ACTIVATION_RESPONSE_FORMAT) {
        issues.push({
            field: 'format',
            code: 'INVALID_FORMAT',
            message: `Formato non valido: atteso "${ACTIVATION_RESPONSE_FORMAT}"`,
        });
    }
    if (raw.formatVersion !== ACTIVATION_FORMAT_VERSION) {
        issues.push({
            field: 'formatVersion',
            code: 'UNSUPPORTED_VERSION',
            message: `Versione formato non supportata: attesa ${ACTIVATION_FORMAT_VERSION}`,
        });
    }
    if (typeof raw.requestId !== 'string' || raw.requestId.trim().length === 0) {
        issues.push({
            field: 'requestId',
            code: 'INVALID_FORMAT',
            message: 'requestId deve essere una stringa non vuota',
        });
    }
    if (typeof raw.createdAt !== 'string' || !isValidIsoDate(raw.createdAt)) {
        issues.push({
            field: 'createdAt',
            code: 'INVALID_FORMAT',
            message: 'createdAt deve essere una data ISO 8601 valida',
        });
    }
    const resVal = ActivationValidator.validateActivationResponse(raw.response);
    if (!resVal.isValid) {
        for (const issue of resVal.issues) {
            issues.push({
                field: `response.${issue.field}`,
                code: issue.code,
                message: issue.message,
            });
        }
    }
    if (issues.length > 0) {
        return { isValid: false, value: null, issues };
    }
    return {
        isValid: true,
        value: {
            format: ACTIVATION_RESPONSE_FORMAT,
            formatVersion: ACTIVATION_FORMAT_VERSION,
            requestId: raw.requestId.trim(),
            createdAt: raw.createdAt,
            response: resVal.value,
        },
        issues: [],
    };
}
// --- Validation Request/Response Envelopes ---
export function createLicenseValidationRequestEnvelope(requestInput, requestId, createdAt) {
    const reqVal = ActivationValidator.validateLicenseValidationRequest(requestInput);
    if (!reqVal.isValid || !reqVal.value) {
        return { isValid: false, value: null, issues: reqVal.issues };
    }
    const finalRequestId = requestId && requestId.trim().length > 0 ? requestId.trim() : generateRequestId();
    const finalCreatedAt = createdAt || new Date().toISOString();
    return {
        isValid: true,
        value: {
            format: VALIDATION_REQUEST_FORMAT,
            formatVersion: ACTIVATION_FORMAT_VERSION,
            requestId: finalRequestId,
            createdAt: finalCreatedAt,
            request: reqVal.value,
        },
        issues: [],
    };
}
export function validateLicenseValidationRequestEnvelope(input) {
    const issues = [];
    if (!input || typeof input !== 'object') {
        return {
            isValid: false,
            value: null,
            issues: [{ field: 'envelope', code: 'INVALID_FORMAT', message: 'L\'envelope deve essere un oggetto non nullo' }],
        };
    }
    const raw = input;
    if (raw.format !== VALIDATION_REQUEST_FORMAT) {
        issues.push({
            field: 'format',
            code: 'INVALID_FORMAT',
            message: `Formato non valido: atteso "${VALIDATION_REQUEST_FORMAT}"`,
        });
    }
    if (raw.formatVersion !== ACTIVATION_FORMAT_VERSION) {
        issues.push({
            field: 'formatVersion',
            code: 'UNSUPPORTED_VERSION',
            message: `Versione formato non supportata: attesa ${ACTIVATION_FORMAT_VERSION}`,
        });
    }
    if (typeof raw.requestId !== 'string' || raw.requestId.trim().length === 0) {
        issues.push({
            field: 'requestId',
            code: 'INVALID_FORMAT',
            message: 'requestId deve essere una stringa non vuota',
        });
    }
    if (typeof raw.createdAt !== 'string' || !isValidIsoDate(raw.createdAt)) {
        issues.push({
            field: 'createdAt',
            code: 'INVALID_FORMAT',
            message: 'createdAt deve essere una data ISO 8601 valida',
        });
    }
    const reqVal = ActivationValidator.validateLicenseValidationRequest(raw.request);
    if (!reqVal.isValid) {
        for (const issue of reqVal.issues) {
            issues.push({
                field: `request.${issue.field}`,
                code: issue.code,
                message: issue.message,
            });
        }
    }
    if (issues.length > 0) {
        return { isValid: false, value: null, issues };
    }
    return {
        isValid: true,
        value: {
            format: VALIDATION_REQUEST_FORMAT,
            formatVersion: ACTIVATION_FORMAT_VERSION,
            requestId: raw.requestId.trim(),
            createdAt: raw.createdAt,
            request: reqVal.value,
        },
        issues: [],
    };
}
export function createLicenseValidationResponseEnvelope(responseInput, requestId, createdAt) {
    const resVal = ActivationValidator.validateLicenseValidationResponse(responseInput);
    if (!resVal.isValid || !resVal.value) {
        return { isValid: false, value: null, issues: resVal.issues };
    }
    const finalRequestId = requestId && requestId.trim().length > 0 ? requestId.trim() : resVal.value.requestId;
    const finalCreatedAt = createdAt || new Date().toISOString();
    return {
        isValid: true,
        value: {
            format: VALIDATION_RESPONSE_FORMAT,
            formatVersion: ACTIVATION_FORMAT_VERSION,
            requestId: finalRequestId,
            createdAt: finalCreatedAt,
            response: resVal.value,
        },
        issues: [],
    };
}
export function validateLicenseValidationResponseEnvelope(input) {
    const issues = [];
    if (!input || typeof input !== 'object') {
        return {
            isValid: false,
            value: null,
            issues: [{ field: 'envelope', code: 'INVALID_FORMAT', message: 'L\'envelope deve essere un oggetto non nullo' }],
        };
    }
    const raw = input;
    if (raw.format !== VALIDATION_RESPONSE_FORMAT) {
        issues.push({
            field: 'format',
            code: 'INVALID_FORMAT',
            message: `Formato non valido: atteso "${VALIDATION_RESPONSE_FORMAT}"`,
        });
    }
    if (raw.formatVersion !== ACTIVATION_FORMAT_VERSION) {
        issues.push({
            field: 'formatVersion',
            code: 'UNSUPPORTED_VERSION',
            message: `Versione formato non supportata: attesa ${ACTIVATION_FORMAT_VERSION}`,
        });
    }
    if (typeof raw.requestId !== 'string' || raw.requestId.trim().length === 0) {
        issues.push({
            field: 'requestId',
            code: 'INVALID_FORMAT',
            message: 'requestId deve essere una stringa non vuota',
        });
    }
    if (typeof raw.createdAt !== 'string' || !isValidIsoDate(raw.createdAt)) {
        issues.push({
            field: 'createdAt',
            code: 'INVALID_FORMAT',
            message: 'createdAt deve essere una data ISO 8601 valida',
        });
    }
    const resVal = ActivationValidator.validateLicenseValidationResponse(raw.response);
    if (!resVal.isValid) {
        for (const issue of resVal.issues) {
            issues.push({
                field: `response.${issue.field}`,
                code: issue.code,
                message: issue.message,
            });
        }
    }
    if (issues.length > 0) {
        return { isValid: false, value: null, issues };
    }
    return {
        isValid: true,
        value: {
            format: VALIDATION_RESPONSE_FORMAT,
            formatVersion: ACTIVATION_FORMAT_VERSION,
            requestId: raw.requestId.trim(),
            createdAt: raw.createdAt,
            response: resVal.value,
        },
        issues: [],
    };
}
// --- Deactivation Request/Response Envelopes ---
export function createLicenseDeactivationRequestEnvelope(requestInput, requestId, createdAt) {
    const reqVal = ActivationValidator.validateLicenseDeactivationRequest(requestInput);
    if (!reqVal.isValid || !reqVal.value) {
        return { isValid: false, value: null, issues: reqVal.issues };
    }
    const finalRequestId = requestId && requestId.trim().length > 0 ? requestId.trim() : generateRequestId();
    const finalCreatedAt = createdAt || new Date().toISOString();
    return {
        isValid: true,
        value: {
            format: DEACTIVATION_REQUEST_FORMAT,
            formatVersion: ACTIVATION_FORMAT_VERSION,
            requestId: finalRequestId,
            createdAt: finalCreatedAt,
            request: reqVal.value,
        },
        issues: [],
    };
}
export function validateLicenseDeactivationRequestEnvelope(input) {
    const issues = [];
    if (!input || typeof input !== 'object') {
        return {
            isValid: false,
            value: null,
            issues: [{ field: 'envelope', code: 'INVALID_FORMAT', message: 'L\'envelope deve essere un oggetto non nullo' }],
        };
    }
    const raw = input;
    if (raw.format !== DEACTIVATION_REQUEST_FORMAT) {
        issues.push({
            field: 'format',
            code: 'INVALID_FORMAT',
            message: `Formato non valido: atteso "${DEACTIVATION_REQUEST_FORMAT}"`,
        });
    }
    if (raw.formatVersion !== ACTIVATION_FORMAT_VERSION) {
        issues.push({
            field: 'formatVersion',
            code: 'UNSUPPORTED_VERSION',
            message: `Versione formato non supportata: attesa ${ACTIVATION_FORMAT_VERSION}`,
        });
    }
    if (typeof raw.requestId !== 'string' || raw.requestId.trim().length === 0) {
        issues.push({
            field: 'requestId',
            code: 'INVALID_FORMAT',
            message: 'requestId deve essere una stringa non vuota',
        });
    }
    if (typeof raw.createdAt !== 'string' || !isValidIsoDate(raw.createdAt)) {
        issues.push({
            field: 'createdAt',
            code: 'INVALID_FORMAT',
            message: 'createdAt deve essere una data ISO 8601 valida',
        });
    }
    const reqVal = ActivationValidator.validateLicenseDeactivationRequest(raw.request);
    if (!reqVal.isValid) {
        for (const issue of reqVal.issues) {
            issues.push({
                field: `request.${issue.field}`,
                code: issue.code,
                message: issue.message,
            });
        }
    }
    if (issues.length > 0) {
        return { isValid: false, value: null, issues };
    }
    return {
        isValid: true,
        value: {
            format: DEACTIVATION_REQUEST_FORMAT,
            formatVersion: ACTIVATION_FORMAT_VERSION,
            requestId: raw.requestId.trim(),
            createdAt: raw.createdAt,
            request: reqVal.value,
        },
        issues: [],
    };
}
export function createLicenseDeactivationResponseEnvelope(responseInput, requestId, createdAt) {
    const resVal = ActivationValidator.validateLicenseDeactivationResponse(responseInput);
    if (!resVal.isValid || !resVal.value) {
        return { isValid: false, value: null, issues: resVal.issues };
    }
    const finalRequestId = requestId && requestId.trim().length > 0 ? requestId.trim() : resVal.value.requestId;
    const finalCreatedAt = createdAt || new Date().toISOString();
    return {
        isValid: true,
        value: {
            format: DEACTIVATION_RESPONSE_FORMAT,
            formatVersion: ACTIVATION_FORMAT_VERSION,
            requestId: finalRequestId,
            createdAt: finalCreatedAt,
            response: resVal.value,
        },
        issues: [],
    };
}
export function validateLicenseDeactivationResponseEnvelope(input) {
    const issues = [];
    if (!input || typeof input !== 'object') {
        return {
            isValid: false,
            value: null,
            issues: [{ field: 'envelope', code: 'INVALID_FORMAT', message: 'L\'envelope deve essere un oggetto non nullo' }],
        };
    }
    const raw = input;
    if (raw.format !== DEACTIVATION_RESPONSE_FORMAT) {
        issues.push({
            field: 'format',
            code: 'INVALID_FORMAT',
            message: `Formato non valido: atteso "${DEACTIVATION_RESPONSE_FORMAT}"`,
        });
    }
    if (raw.formatVersion !== ACTIVATION_FORMAT_VERSION) {
        issues.push({
            field: 'formatVersion',
            code: 'UNSUPPORTED_VERSION',
            message: `Versione formato non supportata: attesa ${ACTIVATION_FORMAT_VERSION}`,
        });
    }
    if (typeof raw.requestId !== 'string' || raw.requestId.trim().length === 0) {
        issues.push({
            field: 'requestId',
            code: 'INVALID_FORMAT',
            message: 'requestId deve essere una stringa non vuota',
        });
    }
    if (typeof raw.createdAt !== 'string' || !isValidIsoDate(raw.createdAt)) {
        issues.push({
            field: 'createdAt',
            code: 'INVALID_FORMAT',
            message: 'createdAt deve essere una data ISO 8601 valida',
        });
    }
    const resVal = ActivationValidator.validateLicenseDeactivationResponse(raw.response);
    if (!resVal.isValid) {
        for (const issue of resVal.issues) {
            issues.push({
                field: `response.${issue.field}`,
                code: issue.code,
                message: issue.message,
            });
        }
    }
    if (issues.length > 0) {
        return { isValid: false, value: null, issues };
    }
    return {
        isValid: true,
        value: {
            format: DEACTIVATION_RESPONSE_FORMAT,
            formatVersion: ACTIVATION_FORMAT_VERSION,
            requestId: raw.requestId.trim(),
            createdAt: raw.createdAt,
            response: resVal.value,
        },
        issues: [],
    };
}
//# sourceMappingURL=envelopes.js.map