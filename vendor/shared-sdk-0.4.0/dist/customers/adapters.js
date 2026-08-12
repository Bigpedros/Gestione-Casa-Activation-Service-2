import { CustomerValidator } from './CustomerValidator.js';
/**
 * Converts a ManagerCustomerEntityLike record into a canonical CustomerDocument.
 */
export function managerCustomerEntityToDocument(record) {
    const kind = record.company && record.company.trim().length > 0
        ? 'organization'
        : 'individual';
    let status = 'pending';
    const rawStatus = (record.status || '').toLowerCase().trim();
    switch (rawStatus) {
        case 'attivo':
        case 'active':
            status = 'active';
            break;
        case 'sospeso':
        case 'suspended':
            status = 'suspended';
            break;
        case 'revocato':
        case 'archived':
            status = 'archived';
            break;
        case 'da_attivare':
        case 'pending':
        default:
            status = 'pending';
            break;
    }
    const metadata = {
        ...(record.metadata || {}),
    };
    if (record.licenseCode && record.licenseCode.trim().length > 0) {
        metadata.legacyLicenseCode = record.licenseCode.trim();
    }
    const partialDoc = {
        id: record.id,
        kind,
        firstName: record.firstName || null,
        lastName: record.lastName || null,
        companyName: record.company || null,
        email: record.email,
        phone: record.phone || null,
        status,
        notes: record.notes || null,
        version: record.version || 1,
        sourceDeviceId: record.sourceDeviceId || null,
        syncStatus: record.syncStatus || 'pending',
        metadata,
    };
    if (record.displayName) {
        partialDoc.displayName = record.displayName;
    }
    if (record.createdAt) {
        partialDoc.createdAt = record.createdAt;
    }
    if (record.updatedAt) {
        partialDoc.updatedAt = record.updatedAt;
    }
    return CustomerValidator.normalize(partialDoc);
}
//# sourceMappingURL=adapters.js.map