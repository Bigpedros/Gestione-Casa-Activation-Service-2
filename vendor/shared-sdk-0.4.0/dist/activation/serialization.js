import { validateActivationRequestEnvelope, validateActivationResponseEnvelope, validateLicenseDeactivationRequestEnvelope, validateLicenseDeactivationResponseEnvelope, validateLicenseValidationRequestEnvelope, validateLicenseValidationResponseEnvelope, } from './envelopes.js';
import { ActivationValidator } from './validators.js';
// Helper for generic JSON parsing
function parseJsonInput(json) {
    if (typeof json !== 'string' || json.trim().length === 0) {
        return {
            isValid: false,
            value: null,
            issues: [
                {
                    field: 'json',
                    code: 'INVALID_FORMAT',
                    message: 'La stringa JSON fornita è vuota o non valida',
                },
            ],
        };
    }
    try {
        const parsed = JSON.parse(json);
        return { isValid: true, value: parsed, issues: [] };
    }
    catch (_err) {
        return {
            isValid: false,
            value: null,
            issues: [
                {
                    field: 'json',
                    code: 'INVALID_FORMAT',
                    message: 'Errore di sintassi durante il parsing del JSON',
                },
            ],
        };
    }
}
// --- Activation Request Envelope Serialization ---
export function serializeActivationRequestEnvelope(input) {
    const val = validateActivationRequestEnvelope(input);
    if (!val.isValid || !val.value) {
        return { isValid: false, value: null, issues: val.issues };
    }
    return { isValid: true, value: JSON.stringify(val.value, null, 2), issues: [] };
}
export function deserializeActivationRequestEnvelope(json) {
    const parseRes = parseJsonInput(json);
    if (!parseRes.isValid) {
        return { isValid: false, value: null, issues: parseRes.issues };
    }
    return validateActivationRequestEnvelope(parseRes.value);
}
// --- Activation Response Envelope Serialization ---
export function serializeActivationResponseEnvelope(input) {
    const val = validateActivationResponseEnvelope(input);
    if (!val.isValid || !val.value) {
        return { isValid: false, value: null, issues: val.issues };
    }
    return { isValid: true, value: JSON.stringify(val.value, null, 2), issues: [] };
}
export function deserializeActivationResponseEnvelope(json) {
    const parseRes = parseJsonInput(json);
    if (!parseRes.isValid) {
        return { isValid: false, value: null, issues: parseRes.issues };
    }
    return validateActivationResponseEnvelope(parseRes.value);
}
// --- License Validation Request Envelope Serialization ---
export function serializeLicenseValidationRequestEnvelope(input) {
    const val = validateLicenseValidationRequestEnvelope(input);
    if (!val.isValid || !val.value) {
        return { isValid: false, value: null, issues: val.issues };
    }
    return { isValid: true, value: JSON.stringify(val.value, null, 2), issues: [] };
}
export function deserializeLicenseValidationRequestEnvelope(json) {
    const parseRes = parseJsonInput(json);
    if (!parseRes.isValid) {
        return { isValid: false, value: null, issues: parseRes.issues };
    }
    return validateLicenseValidationRequestEnvelope(parseRes.value);
}
// --- License Validation Response Envelope Serialization ---
export function serializeLicenseValidationResponseEnvelope(input) {
    const val = validateLicenseValidationResponseEnvelope(input);
    if (!val.isValid || !val.value) {
        return { isValid: false, value: null, issues: val.issues };
    }
    return { isValid: true, value: JSON.stringify(val.value, null, 2), issues: [] };
}
export function deserializeLicenseValidationResponseEnvelope(json) {
    const parseRes = parseJsonInput(json);
    if (!parseRes.isValid) {
        return { isValid: false, value: null, issues: parseRes.issues };
    }
    return validateLicenseValidationResponseEnvelope(parseRes.value);
}
// --- License Deactivation Request Envelope Serialization ---
export function serializeLicenseDeactivationRequestEnvelope(input) {
    const val = validateLicenseDeactivationRequestEnvelope(input);
    if (!val.isValid || !val.value) {
        return { isValid: false, value: null, issues: val.issues };
    }
    return { isValid: true, value: JSON.stringify(val.value, null, 2), issues: [] };
}
export function deserializeLicenseDeactivationRequestEnvelope(json) {
    const parseRes = parseJsonInput(json);
    if (!parseRes.isValid) {
        return { isValid: false, value: null, issues: parseRes.issues };
    }
    return validateLicenseDeactivationRequestEnvelope(parseRes.value);
}
// --- License Deactivation Response Envelope Serialization ---
export function serializeLicenseDeactivationResponseEnvelope(input) {
    const val = validateLicenseDeactivationResponseEnvelope(input);
    if (!val.isValid || !val.value) {
        return { isValid: false, value: null, issues: val.issues };
    }
    return { isValid: true, value: JSON.stringify(val.value, null, 2), issues: [] };
}
export function deserializeLicenseDeactivationResponseEnvelope(json) {
    const parseRes = parseJsonInput(json);
    if (!parseRes.isValid) {
        return { isValid: false, value: null, issues: parseRes.issues };
    }
    return validateLicenseDeactivationResponseEnvelope(parseRes.value);
}
// --- Signed License Document Serialization ---
export function serializeSignedLicenseDocument(input) {
    const val = ActivationValidator.validateSignedLicenseDocument(input);
    if (!val.isValid || !val.value) {
        return { isValid: false, value: null, issues: val.issues };
    }
    return { isValid: true, value: JSON.stringify(val.value, null, 2), issues: [] };
}
export function deserializeSignedLicenseDocument(json) {
    const parseRes = parseJsonInput(json);
    if (!parseRes.isValid) {
        return { isValid: false, value: null, issues: parseRes.issues };
    }
    return ActivationValidator.validateSignedLicenseDocument(parseRes.value);
}
//# sourceMappingURL=serialization.js.map