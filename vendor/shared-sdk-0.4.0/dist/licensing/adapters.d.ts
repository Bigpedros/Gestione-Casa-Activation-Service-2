import type { ClientLicenseSnapshot, LicenseDocument, LicenseEdition, LicenseTerm } from './types.js';
export interface LegacyAppLicenseRecord {
    licenseId: string;
    licenseType: 'beta_60_days' | 'lifetime_perpetual' | 'annual' | 'enterprise';
    activationDate: string | null;
    expirationDate: string | null;
    status: 'not_activated' | 'beta_active' | 'beta_expired' | 'perpetual_active' | 'suspended' | 'invalid';
    owner: string;
}
export interface ManagerLicenseEntityLike {
    id: string;
    licenseCode: string;
    checksum?: string;
    licenseType: 'Standard' | 'Professional' | 'Enterprise';
    status: 'generated' | 'assigned' | 'sent' | 'activated' | 'revoked' | 'expired';
    customerId?: string | null;
    customerName?: string | null;
    deviceId?: string | null;
    sourceDeviceId?: string | null;
    generatedAt: string;
    assignedAt?: string | null;
    sentAt?: string | null;
    activatedAt?: string | null;
    revokedAt?: string | null;
    expiresAt?: string | null;
    expirationDate?: string | null;
}
export declare function legacyAppRecordToSnapshot(record: LegacyAppLicenseRecord, edition?: LicenseEdition): ClientLicenseSnapshot;
export declare function managerEntityToDocument(record: ManagerLicenseEntityLike, term: LicenseTerm): LicenseDocument;
export declare function documentToClientSnapshot(document: LicenseDocument): ClientLicenseSnapshot;
//# sourceMappingURL=adapters.d.ts.map