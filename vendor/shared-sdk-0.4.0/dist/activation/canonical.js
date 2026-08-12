/**
 * Builds the canonical payload v1 for a license document.
 * Guarantees exact deterministic JSON output matching License Manager 2.6.A.
 */
export function buildCanonicalLicensePayloadV1(license) {
    const l = (license || {});
    const code = (l.licenseCode ||
        l.code ||
        '')
        .toString()
        .toUpperCase()
        .trim();
    const canonicalObj = {
        checksum: l.checksum || '',
        customerId: l.customerId || null,
        deviceId: l.deviceId ||
            l.sourceDeviceId ||
            '',
        engineVersion: l.engineVersion || '2.1',
        expiresAt: l.expiresAt ||
            l.expirationDate ||
            null,
        generatedAt: l.generatedAt ||
            l.createdDate ||
            '',
        id: l.id || '',
        licenseCode: code,
        licenseType: l.licenseType ||
            l.planType ||
            'Standard',
        schemaVersion: l.schemaVersion ?? 1,
        status: (l.status || 'generated').toString(),
    };
    return JSON.stringify(canonicalObj);
}
//# sourceMappingURL=canonical.js.map