import { LICENSE_ENGINE_VERSION, LICENSE_SCHEMA_VERSION, } from './constants.js';
import { LicenseValidator } from './LicenseValidator.js';
function mapEdition(value) {
    switch (value) {
        case 'Standard':
            return 'standard';
        case 'Professional':
            return 'professional';
        case 'Enterprise':
            return 'enterprise';
    }
}
function mapLegacyStatus(status) {
    switch (status) {
        case 'not_activated':
            return 'generated';
        case 'beta_active':
        case 'perpetual_active':
            return 'activated';
        case 'beta_expired':
            return 'expired';
        case 'suspended':
            return 'suspended';
        case 'invalid':
            return 'invalid';
    }
}
function mapLegacyTerm(type) {
    switch (type) {
        case 'beta_60_days':
            return 'beta_60_days';
        case 'annual':
            return 'annual';
        case 'lifetime_perpetual':
            return 'perpetual';
        case 'enterprise':
            return 'annual';
    }
}
export function legacyAppRecordToSnapshot(record, edition = 'standard') {
    return {
        licenseCode: LicenseValidator.normalize(record.licenseId),
        edition,
        term: mapLegacyTerm(record.licenseType),
        status: mapLegacyStatus(record.status),
        owner: record.owner,
        customerId: null,
        deviceId: null,
        activatedAt: record.activationDate,
        expiresAt: record.expirationDate,
        engineVersion: LICENSE_ENGINE_VERSION,
        schemaVersion: LICENSE_SCHEMA_VERSION,
    };
}
export function managerEntityToDocument(record, term) {
    const normalizedCode = LicenseValidator.normalize(record.licenseCode);
    const parsed = LicenseValidator.parse(normalizedCode);
    return {
        id: record.id,
        licenseCode: normalizedCode,
        checksum: record.checksum ?? parsed.checksumChar,
        edition: mapEdition(record.licenseType),
        term,
        status: record.status,
        owner: record.customerName ?? '',
        customerId: record.customerId ?? null,
        deviceId: record.deviceId ?? record.sourceDeviceId ?? null,
        generatedAt: record.generatedAt,
        assignedAt: record.assignedAt ?? null,
        sentAt: record.sentAt ?? null,
        activatedAt: record.activatedAt ?? null,
        suspendedAt: null,
        revokedAt: record.revokedAt ?? null,
        expiresAt: record.expiresAt ?? record.expirationDate ?? null,
        engineVersion: LICENSE_ENGINE_VERSION,
        schemaVersion: LICENSE_SCHEMA_VERSION,
        metadata: {},
    };
}
export function documentToClientSnapshot(document) {
    return {
        licenseCode: document.licenseCode,
        edition: document.edition,
        term: document.term,
        status: document.status,
        owner: document.owner,
        customerId: document.customerId,
        deviceId: document.deviceId,
        activatedAt: document.activatedAt,
        expiresAt: document.expiresAt,
        engineVersion: document.engineVersion,
        schemaVersion: document.schemaVersion,
    };
}
//# sourceMappingURL=adapters.js.map